''' Count the number of attributes in a valid XML document '''
import sys
import xml.etree.ElementTree as etree

def get_attr_number(node):
    # your code goes here
    # create empty list for counting attributes
    attributes_list = []
    # Capture any attributes for counting in root tag
    attributes_list.append(len(node.attrib))
    
    for child in node:
        # print(child.tag, child.attrib)
        attributes_list.append(len(child.attrib))
        for subchild in child:
            # print(subchild.tag, subchild.attrib)
            attributes_list.append(len(subchild.attrib))

    return sum(attributes_list)      

if __name__ == '__main__':
    sys.stdin.readline()
    xml = sys.stdin.read()
    tree = etree.ElementTree(etree.fromstring(xml))
    root = tree.getroot()
    print(get_attr_number(root))