# -*- coding: utf-8 -*-
"""
Created on Thu Apr  9 13:51:17 2020

@author: psn99
"""

from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time

# Test with all agents busy and a lot of people in the queues and demonstrate how the program is able to handle this

i = 0
firstname = 'first'
lastname = 'last'
phoneNumber = '1434235'
Skill = ["Phone", "Tablet", "Computer"]
while i < 15:

    driver = webdriver.Chrome()
    driver.get('https://escproject.sutd.org/')
    # Click Live Chat
    Live_Chat = '/html/body/div/div/button'
    driver.find_element_by_xpath(Live_Chat).click()
    # Input First Name
    first_name = driver.find_element_by_xpath("/html/body/div/div/input[1]")
    first_name.send_keys(firstname + str(i))
    # Input Last Name
    last_name = driver.find_element_by_xpath("/html/body/div/div/input[2]")
    last_name.send_keys(lastname + str(i))
    # Input Phone Number
    phone_number = driver.find_element_by_xpath('/html/body/div/div/input[3]')
    phone_number.send_keys(phoneNumber + str(i))
    # Please choose what you want to consult
    j = i % 3
    select = Select(driver.find_element_by_xpath("/html/body/div/div/select"))
    select.select_by_visible_text(Skill[j])
    time.sleep(1)
    # Click Go Back
    #Go_back = '/html/body/div/div[2]/button[2]'
    #driver.find_element_by_xpath (Go_back).click()
    # Click Start Chatting
    Start_Chatting = '/html/body/div/div/button'
    driver.find_element_by_xpath(Start_Chatting).click()
    i += 1
