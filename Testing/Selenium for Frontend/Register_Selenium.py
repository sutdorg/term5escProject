# -*- coding: utf-8 -*-
"""
Created on Thu Mar 26 12:00:32 2020

@author: psn99
"""

from selenium import webdriver
from selenium.webdriver.support.ui import Select
#from selenium.webdriver.chrome.options import Options
import time
i = 0
first_name_list = ['', '', 'Seyong','Seyong', 'Seyong',  'Seyong', 'Seyong']
last_name_list = ['', 'Park', '','Park', 'Park', "Park", "Park"]
phone_number_list = ['', '93915827', '93915827', '', '93915827', 'fsijlfs', '93915827']
select_list = ['Please choose what you want to consult', 'General', 'General', 'General', 'Please choose what you want to consult',  'General', 'General']
while i < 7:
    #options = Options()
    #options.add_argument('--start-fullscreen')
    driver = webdriver.Chrome()
    #driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=options)
    driver.get ('http://127.0.0.1:5500/refactorfe/public/index.html#/')
    time.sleep(1)
    # Click Live Chat
    Live_Chat ='/html/body/div/div/button'
    driver.find_element_by_xpath (Live_Chat).click()
    # Input First Name
    first_name = driver.find_element_by_xpath ("/html/body/div/div/input[1]")
    first_name.send_keys (first_name_list[i])
    # Input Last Name
    last_name = driver.find_element_by_xpath ("/html/body/div/div/input[2]")
    last_name.send_keys (last_name_list[i])
    # Input Phone Number
    phone_number = driver.find_element_by_xpath ('/html/body/div/div/input[3]')
    phone_number.send_keys(phone_number_list[i])
    # Please choose what you want to consult
    select = Select(driver.find_element_by_xpath("/html/body/div/div/select"))
    select.select_by_visible_text(select_list[i])
    time.sleep(3)
    # Click Go Back
    #Go_back = '/html/body/div/div[2]/button[2]'
    #driver.find_element_by_xpath (Go_back).click()
    # Click Start Chatting
    Start_Chatting = '/html/body/div/div/button'
    driver.find_element_by_xpath (Start_Chatting).click()
    #elem.send_keys (Keys.RETURN)
    i += 1