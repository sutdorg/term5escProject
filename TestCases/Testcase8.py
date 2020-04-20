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
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome()
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

driver2 = webdriver.Chrome()
driver2.get('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat = '/html/body/div/div/button'
driver2.find_element_by_xpath(Live_Chat).click()
# Input First Name
first_name = driver2.find_element_by_xpath("/html/body/div/div/input[1]")
first_name.send_keys("Reroute")
# Input Last Name
last_name = driver2.find_element_by_xpath("/html/body/div/div/input[2]")
last_name.send_keys("ToComputer")
# Input Phone Number
phone_number = driver2.find_element_by_xpath('/html/body/div/div/input[3]')
phone_number.send_keys("34636454")
# Please choose what you want to consult
select = Select(driver2.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver2.find_element_by_xpath(Start_Chatting).click()
time.sleep(3)

driver3 = webdriver.Chrome()
wait = WebDriverWait(driver3, 100)
driver3.get('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver3.find_element_by_id("username")
username.send_keys("testagent3@test.com")
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver3.find_element_by_xpath(Continue).click()
time.sleep(3)
pwd = driver3.find_element_by_id("authPwd")
pwd.send_keys("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
wait.until(EC.element_to_be_clickable((By.XPATH, Connect)))
time.sleep(1)
driver3.find_element_by_xpath(Connect).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver3.find_element_by_class_name("buttonTour").click()
time.sleep(3)

time.sleep(3)
driver.find_element_by_class_name("cookies-banner-close").click()
search = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/conversations/div/search-conversations/div/div/input")
search.send_keys("Company Bot")
time.sleep(6)
zeeDummyy = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/conversations/div/div[1]/div[2]/div/div/div/search-cell/div")
time.sleep(10)
zeeDummyy.click()
time.sleep(10)
agentChat = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[5]/conversation-area-component/div/div[1]/div/div[""2]/div/chat-area/div/div[2]/div[4]/div[2]/textarea[1]")
agentChat.send_keys("invalidFormOfCommand")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)
agentChat.send_keys("!invalidCommand")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)
agentChat.send_keys("!help")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)
agentChat.send_keys("!reroute")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)
agentChat.send_keys("!users")
time.sleep(2)
agentChat.send_keys(Keys.RETURN)
time.sleep(10)
messages = driver.find_elements_by_class_name("chatModuleMessage.noselect")
time.sleep(10)
pa = "/html/body/div[2]/div/div[2]/div[1]/div/div[5]/conversation-area-component/div/div[1]/div/div[" \
     "2]/div/chat-area/div/div[1]/div/div[1]/div[" + str(len(messages)) + "]/div "
time.sleep(10)
text = driver.find_element_by_xpath(pa)
textinbubble = text.text
print(textinbubble)
keyword = 'Customer id:'
bkw, kw, after_keyword = textinbubble.partition(keyword)
CustomerID = after_keyword
lcus = len(CustomerID)
secondinx = lcus - 7
print(secondinx)
print(type(secondinx))
CustomerIDf = CustomerID[0:secondinx - 1]
time.sleep(3)
agentChat.clear()
messagetosend = ("!reroute%s Computer" % CustomerIDf)
for x in messagetosend:
    agentChat.send_keys(x)
time.sleep(5)
agentChat.send_keys(Keys.RETURN)
time.sleep(3)

time.sleep(10)

driver.quit()

endChat = "/html/body/div/div/div[1]/button"
driver2.find_element_by_xpath(endChat).click()
time.sleep(5)
driver2.quit()

driver3.quit()
