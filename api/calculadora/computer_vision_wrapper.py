import numpy as np
import pytesseract
import scipy
from PIL import Image, ImageEnhance, ImageFilter
from matplotlib import pyplot as plt

image = Image.open("temp.jpg") # the second one 


# Function which defines a gaussian kernel of a given size and variance
def gaussian_kernel(size=5, sigma=1.0):
	a = np.zeros((size, size))
	a[int(np.floor(size/2)),int(np.floor(size/2))] = 1
	h = skfi.gaussian(a, sigma=sigma, mode='constant', cval=0)
	return h/np.sum(h)


# Function for the preprocessing of the images
def preprocessing(image):
	h_gau = gaussian_kernel(size=5, sigma=1)
	img_gau = scipy.signal.convolve2d(image, h_gau, mode='same')
	image = enhancer.enhance(2)
	image = image.convert('1')
	return image


def image_to_text(image):
	text = pytesseract.image_to_string(Image.open(image))
	return text

print(image_to_text(preprocessing(image)))
