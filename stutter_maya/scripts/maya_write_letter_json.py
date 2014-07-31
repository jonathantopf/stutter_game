import maya.cmds as cmds
import json

replacements = {
    'num_1' : '1',
    'num_2' : '2',
    'num_3' : '3',
    'num_4' : '4',
    'num_5' : '5',
    'num_6' : '6',
    'num_7' : '7',
    'num_8' : '8',
    'num_9' : '9',
    'num_0' : '0',
    'apostraphie' : '\'',
    'full_stop' : '.',
    'comma' : ',',
    'quotes' : '"',
    'exclamation_mark' : '!',
    'question_mark' : '?',
    'left_arrow' : '<',
    'right_arrow' : '>'
}

letters_dict = {}

for letter in cmds.listRelatives('letters'):
    
    resolved_letter = letter
    
    if resolved_letter in replacements:
        resolved_letter = replacements[letter]

    # bbox
    xmin = 99999
    xmax = -99999
    ymin = 99999
    ymax = -99999
    
    lines = []
    
    for child in cmds.listRelatives(letter, f=True):
        if 'bbox' in child: # child is the bbox object
            for point in cmds.getAttr('{0}.cv[*]'.format(child)):
                xmin = point[0] if point[0] < xmin else xmin
                xmax = point[0] if point[0] > xmax else xmax 
                ymin = point[1] if point[1] < ymin else ymin
                ymax = point[1] if point[1] > ymax else ymax
    
        else: # must be a normal line
            line = cmds.getAttr('{0}.cv[*]'.format(child))
            lines.append([[point[0], point[1]] for point in line])
            
    letter_dict = {
        'bbox' : [ymax, xmax, ymin, xmin],
        'data' : lines}
    
    letters_dict[resolved_letter] = letter_dict
        
        
print json.dumps(letters_dict)
        
        
        
        
        
        
        
        
        
        