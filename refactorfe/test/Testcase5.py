# -*- coding: utf-8 -*-
"""
Created on Fri Apr 17 20:06:58 2020

@author: psn99
"""

from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time

# First three customers will be in the chatroom and the last three customers
# will be in the queue. Those three customers will end chat one by one and we
# test whether the person on the top of queue is sent to the chat


driver = webdriver.Chrome()
driver.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Seyong")
# Input Last Name
last_name = driver.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Park")
# Input Phone Number
phone_number = driver.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("93915827")
# Please choose what you want to consult
select = Select(driver.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver.find_element_by_xpath (Start_Chatting).click()

driver2 = webdriver.Chrome()
driver2.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver2.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver2.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Ryan")
# Input Last Name
last_name = driver2.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Gen")
# Input Phone Number
phone_number = driver2.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("34636454")
# Please choose what you want to consult
select = Select(driver2.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver2.find_element_by_xpath (Start_Chatting).click()

driver3 = webdriver.Chrome()
driver3.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver3.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver3.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Shihui")
# Input Last Name
last_name = driver3.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Poh")
# Input Phone Number
phone_number = driver3.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("39687674")
# Please choose what you want to consult
select = Select(driver3.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver3.find_element_by_xpath (Start_Chatting).click()

driver4 = webdriver.Chrome()
driver4.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver4.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver4.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Guoqiang")
# Input Last Name
last_name = driver4.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Hua")
# Input Phone Number
phone_number = driver4.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235436")
# Please choose what you want to consult
select = Select(driver4.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver4.find_element_by_xpath (Start_Chatting).click()

driver5 = webdriver.Chrome()
driver5.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver5.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver5.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon")
# Input Last Name
last_name = driver5.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim")
# Input Phone Number
phone_number = driver5.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("96889236")
# Please choose what you want to consult
select = Select(driver5.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver5.find_element_by_xpath (Start_Chatting).click()

driver6 = webdriver.Chrome()
driver6.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver6.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver6.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Seyong2")
# Input Last Name
last_name = driver6.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Park2")
# Input Phone Number
phone_number = driver6.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235436")
# Please choose what you want to consult
select = Select(driver6.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver6.find_element_by_xpath (Start_Chatting).click()

endChat = "/html/body/div/div/div[1]/button"
time.sleep(6)
driver.find_element_by_xpath (endChat).click()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
time.sleep(6)
driver2.find_element_by_xpath (endChat).click()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
time.sleep(6)
driver3.find_element_by_xpath (endChat).click()
time.sleep(3)