# -*- coding: utf-8 -*-
"""
Created on Sat Apr 18 17:14:31 2020

@author: psn99
"""

import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

#
# from functions import rainbow_login
#
# driver = webdriver.Firefox()
#
driver = webdriver.Firefox()
wait = WebDriverWait(driver, 100)
driver.get('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver.find_element_by_id("username")
username.send_keys("testagent2@test.com")
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver.find_element_by_xpath(Continue).click()
time.sleep(3)
pwd = driver.find_element_by_id("authPwd")
pwd.send_keys("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
wait.until(EC.element_to_be_clickable((By.XPATH, Connect)))
time.sleep(1)
driver.find_element_by_xpath(Connect).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver.find_element_by_class_name("buttonTour").click()
time.sleep(3)
search = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/conversations/div/search-conversations/div/div/input")
search.send_keys("Zee Dummyy")
time.sleep(6)
zeeDummyy = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/conversations/div/div[1]/div[2]/div/div/div/search-cell/div")
time.sleep(10)
zeeDummyy.click()
time.sleep(10)
agentChat = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[5]/conversation-area-component/div/div[1]/div/div["
    "2]/div/chat-area/div/div[2]/div[4]/div[2]/textarea[1]")
agentChat.send_keys("!users")
time.sleep(3)
agentChat.send_keys(Keys.RETURN)
time.sleep(10)
messages = driver.find_elements_by_class_name("chatModuleMessage.noselect")
pa = "/html/body/div[2]/div/div[2]/div[1]/div/div[5]/conversation-area-component/div/div[1]/div/div[" \
     "2]/div/chat-area/div/div[1]/div/div[1]/div[" + str(len(messages)) + "]/div "
text = driver.find_element_by_xpath(pa)
time.sleep(10)
textinbubble = text.text
print(textinbubble)
keyword = 'Customer id:'
bkw, kw, after_keyword = textinbubble.partition(keyword);
CustomerID = after_keyword
time.sleep(3)
agentChat.send_keys("!reroute " + after_keyword + " Phone")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)
