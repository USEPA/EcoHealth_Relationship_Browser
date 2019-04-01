# -*- coding: utf-8 -*-
"""
Created on Thu Nov 29 16:58:38 2018

@author: JBaynes
"""

import pandas
import collections
import json
import re
import datetime
import os
import shutil


print()



work_dir = os.path.dirname(os.path.realpath(__file__))
es_csv = os.path.join(work_dir, 'EcoHealthContent.xlsx')

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
es_services = pandas.read_excel(es_csv, 'ES_Services').fillna('')
es_services_links = pandas.read_excel(es_csv, 'ES_Services_Links').fillna('')
health_outcomes = pandas.read_excel(es_csv, 'Health_Outcomes').fillna('')
health_outcomes_links = pandas.read_excel(es_csv, 'Health_Outcome_Links').fillna('')


content = collections.OrderedDict([('nodes',[]), ('edges', [])])

## First the nodes
### Home Node
#home_node = collections.OrderedDict([('id', 0), ('color', 'black'),
#                                     ('group', ''), ('title', 'Ecosystem'),
#                                     ('text', eco_text)])
#content['nodes'].append(home_node)


## Ecosystems
for i, row in es.iterrows():
    text = "<h4>{0}</h4>".format(row.Ecosystem_Type)
    text += "<p>{0}</p>".format(row.Description)
    text += "<hr style='border-top:2px dashed rgb(170,170,170); background-color:white; margin:0px; padding-bottom:2px'"
    text += "<p>Citations/Sources</p>"
    text += "<p>{0}</p>".format(row.Citations)
    content['nodes'].append(collections.OrderedDict([('id', int(row.ID)), 
                                          ('color', eco_color), 
                                          ('group', 'Ecosystem'), 
                                          ('title',row.Ecosystem_Type),
                                          ('text', text)]))
    
## Ecosystem Services
for i, row in es_services.iterrows():
    text = "<h4>{0}</h4>".format(row.EventType)
    text += "<p>{0}</p>".format(row.Description)
    content['nodes'].append(collections.OrderedDict([('id', int(row.ID)), 
                                          ('color',es_color), 
                                          ('group', 'Ecosystem Services'), 
                                          ('title',row.EventType),
                                          ('text', text)]))

## Health Outcomes
for i, row in health_outcomes.iterrows():
    
    text = "<h4>{0}</h4>".format(row.Issue)
    text += "<p>{0}</p>".format(row.Definition)
    for header in ['OrganSystem', 'Demographics', 'KnownContributingFactors',
                    'TrendInIncidence', 'Citations']:
        if len(row[header]):
            ## camel case to spaces without having to use re
            header_label = ''.join(map(lambda x: x if x.islower() else " "+x, header)).lstrip()
            text += "<h4>{0}</h4>".format(header_label)
            text += "<p>{0}</p>".format(row[header])
    
#    if len(row.Citations):
#        text += "<hr style='border-top:2px dashed rgb(170,170,170); background-color:white; margin:0px; padding-bottom:2px'"
#        text += "<p style='{0}'>Citations/Sources</p>".format(content_style)
#        text += "<p style='{0}'>{1}</p>".format(content_style, row.Citations)
    
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
    text = ("<p>{2}</p>"
            "<br>"
            "<h4>Study Locations</h4>"
            "<p>{3}</p>").format(row.fromID, 
                                 row.toID,
                                 row.Evidence,
                                 row.StudyLocations)
    
    source = int(es[es.Ecosystem_Type==row.fromID].ID.tolist()[0])
    target = int(es_services[es_services.EventType==row.toID].ID.tolist()[0])
    content['edges'].append(collections.OrderedDict([('id',  int(row.ID)), 
                                          ('source',int(source)), 
                                          ('target', int(target)), 
                                          ('text', text)]))
    

## Ecosystem Services - Health Outcomes Linkages
for i, row in health_outcomes_links.iterrows():
    text = "<p>{0}</p>".format(row.Description)
    if len(row.Evidence):
        text += "<h4>Evidence</h4>"
        evidence = ''
        for e in re.split(r'\[(\d{1,2})\]', row.Evidence):
            if len(e):
                ## headers stay the same
                if '</h4>' in e:
                    evidence += e
                ## open <p> and add digit
                elif e.isdigit():
                    evidence += '<p>[{0}]'.format(e)
                ## content and close <p>
                else:
                    evidence += e + '</p>'
        text+= evidence
    
    source = int(es_services[es_services.EventType==row.fromID].ID.tolist()[0])
    target = int(health_outcomes[health_outcomes.Issue==row.toID].ID.tolist()[0])
    content['edges'].append(collections.OrderedDict([('id',  int(row.ID)), 
                                          ('source',int(source)), 
                                          ('target', int(target)), 
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
    
    



