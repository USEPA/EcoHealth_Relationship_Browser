# -*- coding: utf-8 -*-
"""
Created on Mon Mar 18 16:43:15 2019

@author: JBaynes
"""

import pandas
from collections import OrderedDict
import json
import os

work_dir = os.path.dirname(os.path.realpath(__file__))
es_csv = os.path.join(work_dir, 'EcoHealthContent.xlsx')

biblio = pandas.read_excel(es_csv, 'Bibliography').fillna('')

biblio_dict = biblio.to_dict(into=OrderedDict, orient='records')

output_json = os.path.join(work_dir, 'Bibliography_Content.js')

with open(output_json, 'w') as outfile:
    outfile.write('var eco_health_bib_content = ')
with open(output_json, 'a') as outfile:
    json.dump(biblio_dict, outfile, indent=2)
