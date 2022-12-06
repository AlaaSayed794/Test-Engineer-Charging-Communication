'''
Created on Dec 1, 2022

@author: Alaa
'''
import unittest
import subprocess

class TestToolWithNoArguments(unittest.TestCase):


    def tearDown(self):
        pass


    def test(self):
        
        p = subprocess.run(["Transformation.exe"],capture_output=True)
        self.assertNotEqual(p.returncode,0,"expect a non zero return code")
        



if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()