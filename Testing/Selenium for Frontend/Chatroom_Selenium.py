# -*- coding: utf-8 -*-
"""
Created on Thu Mar 26 17:07:33 2020

@author: psn99
"""

from selenium import webdriver
#from selenium.webdriver.support.ui import Select
#from selenium.webdriver.chrome.options import Options
import time

driver = webdriver.Chrome()
driver.get ('http://127.0.0.1:5500/refactorfe/public/index.html#/chatroom')
time.sleep(3)
message = driver.find_element_by_xpath ('/html/body/div/div/div[3]/textarea')
message.send_keys ("Hi! I am undefined")
Send = '/html/body/div/div/div[3]/button'
driver.find_element_by_xpath (Send).click()
time.sleep(3)
message = driver.find_element_by_xpath ('/html/body/div/div/div[3]/textarea')
message.send_keys ("Please help me.")
Send = '/html/body/div/div/div[3]/button'
driver.find_element_by_xpath (Send).click()
time.sleep(3)
message = driver.find_element_by_xpath ('/html/body/div/div/div[3]/textarea')
message.send_keys ("Thank you. Bye.")
Send = '/html/body/div/div/div[3]/button'
driver.find_element_by_xpath (Send).click()
time.sleep(3)
End = '/html/body/div/div/div[1]/button'
driver.find_element_by_xpath (End).click()
time.sleep(3)
driver.close()