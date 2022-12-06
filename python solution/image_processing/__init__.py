'''
Created on Dec 1, 2022
reference:https://stackoverflow.com/questions/9041681/opencv-python-rotate-image-by-x-degrees-around-specific-point
@author: Alaa
'''
from PIL import Image
import cv2
import numpy as np

def compare_images(path1,path2):
    img1 = cv2.imread(path1)
    img2 = cv2.imread(path2)
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    h, w = img1.shape
    diff = cv2.subtract(img1, img2)
    err = np.sum(diff**2)
    mse = err/(float(h*w))
    return mse<0.01

def rotate_image(path,angle):
    #read the image
    im = Image.open(path)
    out = im.rotate(angle, expand=True)
    out.save('rotate.bmp')