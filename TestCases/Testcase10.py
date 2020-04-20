# -*- coding: utf-8 -*-
"""
Created on Mon Apr 20 22:48:00 2020

@author: psn99
"""

import time

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 100)
driver.get('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver.find_element_by_id("username")
username.send_keys("testagent4@test.com")
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
time.sleep(2)
driver.find_element_by_id("userSettings").click()
time.sleep(1)
Online = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[3]/top-area/div/div[2]/div[2]/top-user/div/div[2]/ul/li[1]/a/div[2]/span")
action = ActionChains(driver)
action.move_to_element(Online).perform()
time.sleep(2)
Away = driver.find_element_by_xpath(
    '/html/body/div[2]/div/div[2]/div[1]/div/div[3]/top-area/div/div[2]/div[2]/top-user/div/div[2]/ul/li[1]/ul/li[2]/a/div[3]/span')
Away.click()
time.sleep(2)

driver2 = webdriver.Chrome()
driver2.get('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat = '/html/body/div/div/button'
driver2.find_element_by_xpath(Live_Chat).click()
# Input First Name
first_name = driver2.find_element_by_xpath("/html/body/div/div/input[1]")
first_name.send_keys("Blocked")
# Input Last Name
last_name = driver2.find_element_by_xpath("/html/body/div/div/input[2]")
last_name.send_keys("User")
# Input Phone Number
phone_number = driver2.find_element_by_xpath('/html/body/div/div/input[3]')
phone_number.send_keys("34636454")
# Please choose what you want to consult
select = Select(driver2.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver2.find_element_by_xpath(Start_Chatting).click()
time.sleep(7)

driver.find_element_by_id("userSettings").click()
time.sleep(1)
action1 = ActionChains(driver)
action1.move_to_element(driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[3]/top-area/div/div[2]/div[2]/top-user/div/div[2]/ul/li[1]/a/div[2]/span")).perform()
time.sleep(2)
asd = driver.find_element_by_xpath(
    "/html/body/div[2]/div/div[2]/div[1]/div/div[3]/top-area/div/div[2]/div[2]/top-user/div/div[2]/ul/li[1]/ul/li[1]/a/div[3]/span")

time.sleep(1)
asd.click()
time.sleep(24)

endChat = "/html/body/div/div/div[1]/button"
driver2.find_element_by_xpath(endChat).click()
time.sleep(5)
driver2.quit()

driver.quit()
