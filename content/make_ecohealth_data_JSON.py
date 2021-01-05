# -*- coding: utf-8 -*-
"""
Created on Thu Nov 29 16:58:38 2018
Purpose: Convert EcoHealth Relationship Browser Content stored in an Excel 
         spreadsheet to JSON.
@author: JBaynes
"""

import pandas
import collections
import json
import re
import datetime
import os
import shutil

def add_url(s):
    return re.sub(u'(<a href="#)(.*?)(">)', r'<a href="{0}#\2" target="_blank">'.format(url), s)

def replace_quotes(df):
    #replace single and double quotes unicode with ascii characters
    a = df.replace([u'\u201c', u'\u201d'], '"', regex=True)
    b = a.replace([u'\u2018', u'\u2019'], "'", regex=True)
    return b

work_dir = os.path.dirname(os.path.realpath(__file__))

es_csv = os.path.join(work_dir, 'EcoHealthContent.xlsx')

url = 'https://leb.epa.gov/enviroatlas/natlas/currentdevelopment/Tools/EcoHealth_RelationshipBrowser/bibliography.html'
url = 'https://enviroatlas.epa.gov/enviroatlas/Tools/EcoHealth_RelationshipBrowser/bibliography.html'

eco_color = 'black'
es_color = 'black'
health_color = 'black'

eco_text = ("<h3>EnviroAtlas Eco-Health Relationship Browser</h3>The Eco-Health "
            "Relationship Browser illustrates scientific evidence for linkages "
            "between human health and ecosystem services. This interactive tool "
            "provides information about several of our nation's major "
            "ecosystems, the services they provide, and how those service, "
            "or their degradation and loss, may affect people.")
		

es = pandas.read_excel(es_csv, 'Ecosystems').fillna('')
es = replace_quotes(es)

es_services = pandas.read_excel(es_csv, 'ES_Services').fillna('')
es_services = replace_quotes(es_services)

es_services_links = pandas.read_excel(es_csv, 'ES_Services_Links').fillna('')
es_services_links = replace_quotes(es_services_links)

health_outcomes = pandas.read_excel(es_csv, 'Health_Outcomes').fillna('')
health_outcomes = replace_quotes(health_outcomes)

health_outcomes_links = pandas.read_excel(es_csv, 'Health_Outcome_Links').fillna('')
health_outcomes_links = replace_quotes(health_outcomes_links)


content = collections.OrderedDict([('nodes',[]), ('edges', [])])

## First the nodes
### Home Node
#home_node = collections.OrderedDict([('id', 0), ('color', 'black'),
#                                     ('group', ''), ('title', 'Ecosystem'),
#                                     ('text', eco_text)])
#content['nodes'].append(home_node)


## Ecosystems
for i, row in es.iterrows():
    text = collections.OrderedDict([(row.Ecosystem_Type, add_url(row.Description)),
                                    ('References', add_url(row.References))])
    
    content['nodes'].append(collections.OrderedDict([('id', int(row.ID)), 
                                          ('color', eco_color), 
                                          ('group', 'Ecosystem'), 
                                          ('title',row.Ecosystem_Type),
                                          ('text', text)]))
    
## Ecosystem Services
for i, row in es_services.iterrows():
    text = collections.OrderedDict([(row.EventType, add_url(row.Description)),
                                    ('References', add_url(row.References))])
    
    content['nodes'].append(collections.OrderedDict([('id', int(row.ID)), 
                                          ('color',es_color), 
                                          ('group', 'Ecosystem Services'), 
                                          ('title',row.EventType),
                                          ('text', text)]))

## Health Outcomes
for i, row in health_outcomes.iterrows():
    

    text = collections.OrderedDict([(row.Issue, row.Definition)])
    

    for header in ['OrganSystem', 'Demographics', 'KnownContributingFactors',
                    'TrendInIncidence', 'References']:
        header_label = ''.join(map(lambda x: x if x.islower() else " "+x, header)).lstrip()
        text[header_label] = ''
        if len(row[header]):
            text[header_label] = add_url(row[header])
    
    content['nodes'].append(collections.OrderedDict([('id', int(row.ID)), 
                                          ('color',health_color), 
                                          ('group', 'Health Outcomes'), 
                                          ('title',row.Issue),
                                          ('text', text)]))

## Then the edges
        
### We've decided to remove the first links that connect an empty Ecosystem 
### header node to the Ecosystems.  Uncomment to bring back
## Home Node - Ecosystem Linkages
#for i, row in es.iterrows():
#    content['edges'].append(collections.OrderedDict([('id',  int(row.ID)), 
#                                          ('source',0), 
#                                          ('target', row.ID), 
#                                          ('text', '')]))

## Ecosystem - Ecosystem Services Linkages
for i, row in es_services_links.iterrows():

    source_id = int(es[es.Ecosystem_Type==row.fromID].ID.tolist()[0])
    source_text = es[es.Ecosystem_Type==row.fromID].Ecosystem_Type.tolist()[0]
    target_id = int(es_services[es_services.EventType==row.toID].ID.tolist()[0])
    target_text = es_services[es_services.EventType==row.toID].EventType.tolist()[0] 
    
    text = collections.OrderedDict([(source_text + ' &#8594; ' + target_text, '&nbsp;')])
    
    evidence_headers = re.findall(r'\*(.*?)\*', row.Evidence) #headers are between asterisk
    
    if len(evidence_headers):
        for j, evidence_header in enumerate(evidence_headers):
            ## test for content before the first header
            if j == 0:
                pat = r'(.*?)\*'+re.escape(evidence_headers[j])
                if len(pat):
                    text[''] = re.findall(pat, add_url(row.Evidence))
            if j < len(evidence_headers)-1:
                pat = (re.escape(evidence_headers[j])+r'\*(.*?)\*'+re.escape(evidence_headers[j+1]))     
            else:
                pat = re.escape(evidence_headers[j])+r'\*(.*?)$'
                
            evidence_group = re.findall(pat, add_url(row.Evidence))
            
            text[evidence_header] = evidence_group
            
    else:
        text = collections.OrderedDict([(source_text + ' &#8594; ' + target_text, add_url(row.Evidence))])
    
    text['Study Locations'] = add_url(row.StudyLocations)
    
    content['edges'].append(collections.OrderedDict([('id',  int(row.ID)), 
                                          ('source',int(source_id)), 
                                          ('source_text',source_text), 
                                          ('target', int(target_id)), 
                                          ('target_text', target_text), 
                                          ('text', text)]))
        

## Ecosystem Services - Health Outcomes Linkages
for i, row in health_outcomes_links.iterrows():
    
    source_id = int(es_services[es_services.EventType==row.fromID].ID.tolist()[0])
    source_text = es_services[es_services.EventType==row.fromID].EventType.tolist()[0]
    target_id = int(health_outcomes[health_outcomes.Issue==row.toID].ID.tolist()[0])
    target_text = health_outcomes[health_outcomes.Issue==row.toID].Issue.tolist()[0]
    
    
    
    text = collections.OrderedDict([(source_text + ' &#8594; ' + target_text, add_url(row.Description))])
    text['Evidence'] = ''
    
    evidence_headers = re.findall(r'\*(.*?)\*', row.Evidence) #headers are between asterisk
#    
#
#
    if len(evidence_headers):
        for j, evidence_header in enumerate(evidence_headers):
            if j < len(evidence_headers)-1:
                pat = (re.escape(evidence_headers[j])+r'\*(.*?)\*'+re.escape(evidence_headers[j+1])+'\*')     
            else:
                pat = re.escape(evidence_headers[j])+r'\*(.*?)$'
                
            evidence_group = re.findall(pat, row.Evidence, re.DOTALL)
            evidence_group = [a.strip() for a in evidence_group]
            
            evidence_numbers = re.findall(r'\[(\d{1,2})\]', evidence_group[0])
            evidence_text = filter(None, re.split(r'\[\d{1,2}\]', evidence_group[0]))
                
            assert(len(evidence_numbers)==len(evidence_text))
            
            evidence_string =  ['['+m+'] ' +  (add_url(n)) for m,n in zip(evidence_numbers,evidence_text)]
            
            text[evidence_header] = evidence_string
            
    else:
        evidence_group = [row.Evidence]
        
        
        evidence_numbers = re.findall(r'\[(\d{1,2})\]', evidence_group[0])
        evidence_text = filter(None, re.split(r'\[\d{1,2}\]', evidence_group[0]))
        
        
        assert(len(evidence_numbers)==len(evidence_text))
        
        evidence_string =  ['['+m+'] ' + add_url(n) for m,n in zip(evidence_numbers,evidence_text)]
        
        text['Evidence']=evidence_string

    
    content['edges'].append(collections.OrderedDict([('id',  int(row.ID)), 
                                          ('source',int(source_id)), 
                                          ('source_text',source_text), 
                                          ('target', int(target_id)), 
                                          ('target_text', target_text), 
                                          ('text', text)]))

#export json   
output_json = os.path.join(work_dir, 'EcoHealth_Content.js')
if os.path.exists(output_json):
    now = datetime.datetime.now()
    archive_json = os.path.join(work_dir, 'EcoHealthData_{0}_archive.json'.format(now.strftime("%Y_%m_%d_%H_%M_%S")))
    shutil.copy2(output_json, archive_json) 
with open(output_json, 'w') as outfile:
    outfile.write('var graph = ')
with open(output_json, 'a') as outfile:
    json.dump(content, outfile, indent=2)
    
    



