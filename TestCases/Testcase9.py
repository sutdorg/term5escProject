# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 15:20:24 2020

@author: psn99
"""

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
options.add_argument("--disable-notifications")

driver2 = webdriver.Firefox (options=options)
driver2.set_window_position(0, 0)
driver2.set_window_size(320, 400)
driver2.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver2.find_element_by_xpath (Live_Chat).click()

driver4 = webdriver.Firefox (options=options)
driver4.set_window_position(0, 370)
driver4.set_window_size(320, 400)
driver4.get ('https://escproject.sutd.org/')
time.sleep(3)
driver4.find_element_by_xpath (Live_Chat).click()

driver9 = webdriver.Firefox (options=options)
driver9.set_window_position(0, 740)
driver9.set_window_size(320, 400)
driver9.get ('https://escproject.sutd.org/')
time.sleep(3)
driver9.find_element_by_xpath (Live_Chat).click()

driver10 = webdriver.Firefox (options=options)
driver10.set_window_position(250, 0)
driver10.set_window_size(320, 400)
driver10.get ('https://escproject.sutd.org/')
time.sleep(3)
driver10.find_element_by_xpath (Live_Chat).click()

driver11 = webdriver.Firefox (options=options)
driver11.set_window_position(250, 370)
driver11.set_window_size(320, 400)
driver11.get ('https://escproject.sutd.org/')
time.sleep(3)
driver11.find_element_by_xpath (Live_Chat).click()

driver7 = webdriver.Firefox (options=options)
driver7.set_window_position(250, 740)
driver7.set_window_size(320, 400)
driver7.get ('https://escproject.sutd.org/')
time.sleep(3)
driver7.find_element_by_xpath (Live_Chat).click()

driver8 = webdriver.Firefox (options=options)
driver8.set_window_position(500, 0)
driver8.set_window_size(320, 400)
driver8.get ('https://escproject.sutd.org/')
time.sleep(3)
driver8.find_element_by_xpath (Live_Chat).click()

driver3 = webdriver.Firefox (options=options)
driver3.set_window_position(500, 370)
driver3.set_window_size(320, 400)
driver3.get ('https://escproject.sutd.org/')
time.sleep(3)
driver3.find_element_by_xpath (Live_Chat).click()

driver12 = webdriver.Firefox (options=options)
driver12.set_window_position(500, 740)
driver12.set_window_size(320, 400)
driver12.get ('https://escproject.sutd.org/')
time.sleep(3)
driver12.find_element_by_xpath (Live_Chat).click()

driver15 = webdriver.Firefox (options=options)
driver15.set_window_position(750, 0)
driver15.set_window_size(320, 400)
driver15.get ('https://escproject.sutd.org/')
time.sleep(3)
driver15.find_element_by_xpath (Live_Chat).click()

driver18 = webdriver.Firefox (options=options)
driver18.set_window_position(750, 370)
driver18.set_window_size(320, 400)
driver18.get ('https://escproject.sutd.org/')
time.sleep(3)
driver18.find_element_by_xpath (Live_Chat).click()

driver19 = webdriver.Firefox (options=options)
driver19.set_window_position(750, 740)
driver19.set_window_size(320, 400)
driver19.get ('https://escproject.sutd.org/')
time.sleep(3)
driver19.find_element_by_xpath (Live_Chat).click()

driver23 = webdriver.Firefox (options=options)
driver23.set_window_position(1000, 0)
driver23.set_window_size(320, 400)
driver23.get ('https://escproject.sutd.org/')
time.sleep(3)
driver23.find_element_by_xpath (Live_Chat).click()

driver20 = webdriver.Firefox (options=options)
driver20.set_window_position(1000, 370)
driver20.set_window_size(320, 400)
driver20.get ('https://escproject.sutd.org/')
time.sleep(3)
driver20.find_element_by_xpath (Live_Chat).click()

driver21 = webdriver.Firefox (options=options)
driver21.set_window_position(1000, 740)
driver21.set_window_size(320, 400)
driver21.get ('https://escproject.sutd.org/')
time.sleep(3)
driver21.find_element_by_xpath (Live_Chat).click()

driver = webdriver.Firefox(options = options)
driver.set_window_position (1250, 0)
driver.set_window_size (320, 400)
wait = WebDriverWait(driver, 100)
driver.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver.find_element_by_id ("username")
username.send_keys ("testagent4@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver.find_element_by_xpath (Continue).click()
time.sleep(5)
pwd = driver.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")

driver5 = webdriver.Firefox (options = options)
driver5.set_window_position (1250, 370)
driver5.set_window_size (320, 400)
wait = WebDriverWait(driver5, 100)
driver5.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver5.find_element_by_id ("username")
username.send_keys ("testagent2@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver5.find_element_by_xpath (Continue).click()
time.sleep(5)
pwd = driver5.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")

driver14 = webdriver.Firefox(options = options)
driver14.set_window_position (1250, 740)
driver14.set_window_size (320, 400)
wait = WebDriverWait(driver14, 100)
driver14.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver14.find_element_by_id ("username")
username.send_keys ("testagent3@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver14.find_element_by_xpath (Continue).click()
time.sleep(5)
pwd = driver14.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")

driver17 = webdriver.Firefox(options = options)
driver17.set_window_position (1500, 0)
driver17.set_window_size (320, 400)
wait = WebDriverWait(driver17, 100)
driver17.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
wait.until(EC.presence_of_element_located((By.ID, "username")))
time.sleep(1)
username = driver17.find_element_by_id ("username")
username.send_keys ("testagent6@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
wait.until(EC.element_to_be_clickable((By.XPATH, Continue)))
time.sleep(1)
driver17.find_element_by_xpath (Continue).click()
time.sleep(5)
pwd = driver17.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")

time.sleep (5)

driver.set_window_size (500, 500)
driver.set_window_position (2600, 50)
wait = WebDriverWait(driver, 100)
time.sleep (2)
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
time.sleep(1)
driver.find_element_by_xpath (Connect).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver.find_element_by_class_name("cookies-banner-close").click()
time.sleep(1)
driver.find_element_by_class_name ("buttonTour").click()
time.sleep (5)

# Input First Name
first_name = driver2.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Tablet1")
# Input Last Name
last_name = driver2.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Tablet1")
# Input Phone Number
phone_number = driver2.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235431")
# Please choose what you want to consult
select = Select(driver2.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver2.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver4.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone1")
# Input Last Name
last_name = driver4.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone1")
# Input Phone Number
phone_number = driver4.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235433")
# Please choose what you want to consult
select = Select(driver4.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver4.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver9.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Computer1")
# Input Last Name
last_name = driver9.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Computer1")
# Input Phone Number
phone_number = driver9.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235434")
# Please choose what you want to consult
select = Select(driver9.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver9.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver10.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone2")
# Input Last Name
last_name = driver10.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone2")
# Input Phone Number
phone_number = driver10.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235435")
# Please choose what you want to consult
select = Select(driver10.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver10.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver11.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone3")
# Input Last Name
last_name = driver11.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone3")
# Input Phone Number
phone_number = driver11.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235436")
# Please choose what you want to consult
select = Select(driver11.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver11.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

driver5.set_window_size (500, 500)
driver5.set_window_position (2000, 50)
wait = WebDriverWait(driver5, 100)
time.sleep (2)
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
time.sleep(1)
driver5.find_element_by_xpath (Connect).click()
element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver5.find_element_by_class_name("cookies-banner-close").click()
time.sleep(1)
driver5.find_element_by_class_name ("buttonTour").click()
time.sleep (10)

# Input First Name
first_name = driver7.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone4")
# Input Last Name
last_name = driver7.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone4")
# Input Phone Number
phone_number = driver7.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235438")
# Please choose what you want to consult
select = Select(driver7.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver7.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver8.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Computer2")
# Input Last Name
last_name = driver8.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Computer2")
# Input Phone Number
phone_number = driver8.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235439")
# Please choose what you want to consult
select = Select(driver8.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver8.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver3.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Tablet2")
# Input Last Name
last_name = driver3.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Tablet2")
# Input Phone Number
phone_number = driver3.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235432")
# Please choose what you want to consult
select = Select(driver3.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver3.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

# Input First Name
first_name = driver12.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Computer3")
# Input Last Name
last_name = driver12.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Computer3")
# Input Phone Number
phone_number = driver12.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235410")
# Please choose what you want to consult
select = Select(driver12.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver12.find_element_by_xpath (Start_Chatting).click()
time.sleep (3)

endChat = "/html/body/div/div/div[1]/button"
driver2.find_element_by_xpath (endChat).click()
time.sleep(5)
driver2.quit()
time.sleep(5)

# Input First Name
first_name = driver15.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Computer4")
# Input Last Name
last_name = driver15.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Computer4")
# Input Phone Number
phone_number = driver15.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235412")
# Please choose what you want to consult
select = Select(driver15.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver15.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

driver14.set_window_size (500, 500)
driver14.set_window_position (2000, 600)
wait = WebDriverWait(driver14, 100)
time.sleep (2)
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
time.sleep(1)
driver14.find_element_by_xpath (Connect).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver14.find_element_by_class_name("cookies-banner-close").click()
time.sleep(1)
driver14.find_element_by_class_name ("buttonTour").click()
time.sleep (10)

endChat = "/html/body/div/div/div[1]/button"
driver3.find_element_by_xpath (endChat).click()
time.sleep(5)
driver3.quit()
time.sleep(3)

driver17.set_window_size (500, 500)
driver17.set_window_position (2600,600)
wait = WebDriverWait(driver17, 100)
time.sleep (2)
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
time.sleep(1)
driver17.find_element_by_xpath (Connect).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver17.find_element_by_class_name("cookies-banner-close").click()
time.sleep(1)
driver17.find_element_by_class_name ("buttonTour").click()
time.sleep (10)

endChat = "/html/body/div/div/div[1]/button"
driver4.find_element_by_xpath (endChat).click()
time.sleep(5)
driver4.quit()
time.sleep(10)

# Input First Name
first_name = driver18.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone5")
# Input Last Name
last_name = driver18.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone5")
# Input Phone Number
phone_number = driver18.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235414")
# Please choose what you want to consult
select = Select(driver18.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver18.find_element_by_xpath (Start_Chatting).click()
time.sleep (8)

# Input First Name
first_name = driver19.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone6")
# Input Last Name
last_name = driver19.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone6")
# Input Phone Number
phone_number = driver19.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235415")
# Please choose what you want to consult
select = Select(driver19.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver19.find_element_by_xpath (Start_Chatting).click()
time.sleep (8)

# Input First Name
first_name = driver23.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Computer5")
# Input Last Name
last_name = driver23.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Computer5")
# Input Phone Number
phone_number = driver23.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235415")
# Please choose what you want to consult
select = Select(driver23.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver23.find_element_by_xpath (Start_Chatting).click()
time.sleep (8)

# Input First Name
first_name = driver20.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone7")
# Input Last Name
last_name = driver20.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone7")
# Input Phone Number
phone_number = driver20.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235416")
# Please choose what you want to consult
select = Select(driver20.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver20.find_element_by_xpath (Start_Chatting).click()
time.sleep (8)

endChat = "/html/body/div/div/div[1]/button"
driver7.find_element_by_xpath (endChat).click()
time.sleep(5)
driver7.quit()
time.sleep(5)

endChat = "/html/body/div/div/div[1]/button"
driver10.find_element_by_xpath (endChat).click()
time.sleep(5)
driver10.quit()
time.sleep(5)

endChat = "/html/body/div/div/div[1]/button"
driver11.find_element_by_xpath (endChat).click()
time.sleep(3)
driver11.quit()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
driver15.find_element_by_xpath (endChat).click()
time.sleep(5)
driver15.quit()
time.sleep(5)

endChat = "/html/body/div/div/div[1]/button"
driver18.find_element_by_xpath (endChat).click()
time.sleep(3)
driver18.quit()
time.sleep(3)

# Input First Name
first_name = driver21.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Phone8")
# Input Last Name
last_name = driver21.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Phone8")
# Input Phone Number
phone_number = driver21.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235417")
# Please choose what you want to consult
select = Select(driver21.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver21.find_element_by_xpath (Start_Chatting).click()
time.sleep (5)

endChat = "/html/body/div/div/div[1]/button"
driver9.find_element_by_xpath (endChat).click()
time.sleep(3)
driver9.quit()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
driver8.find_element_by_xpath (endChat).click()
time.sleep(3)
driver8.quit()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
driver12.find_element_by_xpath (endChat).click()
time.sleep(3)
driver12.quit()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
driver23.find_element_by_xpath (endChat).click()
time.sleep(3)
driver23.quit()
time.sleep(5)

endChat = "/html/body/div/div/div[1]/button"
driver19.find_element_by_xpath (endChat).click()
time.sleep(3)
driver19.quit()
time.sleep(3)

endChat = "/html/body/div/div/div[1]/button"
driver21.find_element_by_xpath (endChat).click()
time.sleep(3)
driver21.quit()
time.sleep(5)

endChat = "/html/body/div/div/div[1]/button"
driver20.find_element_by_xpath (endChat).click()
time.sleep(3)
driver20.quit()
time.sleep(5)


driver.quit()
time.sleep(3)


driver5.quit()
time.sleep(3)


driver14.quit()
time.sleep(3)


driver17.quit()
time.sleep(3)