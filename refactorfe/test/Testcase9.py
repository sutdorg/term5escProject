# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 15:20:24 2020

@author: psn99
"""

from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 30)
driver.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
username = driver.find_element_by_id ("username")
username.send_keys ("testagent4@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
driver.find_element_by_xpath (Continue).click()
time.sleep(3)
pwd = driver.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
driver.find_element_by_xpath (Connect).click()
element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver.find_element_by_class_name ("buttonTour").click()
time.sleep (2)

driver2 = webdriver.Chrome ()
driver2.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver2.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver2.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon1")
# Input Last Name
last_name = driver2.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim1")
# Input Phone Number
phone_number = driver2.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235431")
# Please choose what you want to consult
select = Select(driver2.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver2.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver3 = webdriver.Chrome ()
driver3.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver3.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver3.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon2")
# Input Last Name
last_name = driver3.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim2")
# Input Phone Number
phone_number = driver3.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235432")
# Please choose what you want to consult
select = Select(driver3.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver3.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver4 = webdriver.Chrome ()
driver4.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver4.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver4.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon3")
# Input Last Name
last_name = driver4.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim3")
# Input Phone Number
phone_number = driver4.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235433")
# Please choose what you want to consult
select = Select(driver4.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver4.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver9 = webdriver.Chrome ()
driver9.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver9.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver9.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon4")
# Input Last Name
last_name = driver9.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim4")
# Input Phone Number
phone_number = driver9.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235434")
# Please choose what you want to consult
select = Select(driver9.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver9.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver10 = webdriver.Chrome ()
driver10.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver10.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver10.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon5")
# Input Last Name
last_name = driver10.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim5")
# Input Phone Number
phone_number = driver10.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235435")
# Please choose what you want to consult
select = Select(driver10.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver10.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver11 = webdriver.Chrome ()
driver11.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver11.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver11.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon6")
# Input Last Name
last_name = driver11.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim6")
# Input Phone Number
phone_number = driver11.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235436")
# Please choose what you want to consult
select = Select(driver11.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver11.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver5 = webdriver.Chrome()
wait = WebDriverWait(driver5, 30)
driver5.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
username = driver5.find_element_by_id ("username")
username.send_keys ("testagent2@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
driver5.find_element_by_xpath (Continue).click()
time.sleep(3)
pwd = driver5.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
driver5.find_element_by_xpath (Connect).click()
element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver5.find_element_by_class_name ("buttonTour").click()
time.sleep (2)

driver6 = webdriver.Chrome ()
driver6.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver6.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver6.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon7")
# Input Last Name
last_name = driver6.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim7")
# Input Phone Number
phone_number = driver6.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235437")
# Please choose what you want to consult
select = Select(driver6.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver6.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver7 = webdriver.Chrome ()
driver7.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver7.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver7.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon8")
# Input Last Name
last_name = driver7.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim8")
# Input Phone Number
phone_number = driver7.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235438")
# Please choose what you want to consult
select = Select(driver7.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver7.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver8 = webdriver.Chrome ()
driver8.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver8.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver8.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon9")
# Input Last Name
last_name = driver8.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim9")
# Input Phone Number
phone_number = driver8.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235439")
# Please choose what you want to consult
select = Select(driver8.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver8.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver12 = webdriver.Chrome ()
driver12.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver12.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver12.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon10")
# Input Last Name
last_name = driver12.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim10")
# Input Phone Number
phone_number = driver12.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235410")
# Please choose what you want to consult
select = Select(driver12.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver12.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver13 = webdriver.Chrome ()
driver13.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver13.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver13.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon11")
# Input Last Name
last_name = driver13.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim11")
# Input Phone Number
phone_number = driver13.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235411")
# Please choose what you want to consult
select = Select(driver13.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver13.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver3.find_element_by_xpath (endChat).click()
time.sleep(3)
driver3.quit()
time.sleep(1)

driver15 = webdriver.Chrome ()
driver15.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver15.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver15.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon12")
# Input Last Name
last_name = driver15.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim12")
# Input Phone Number
phone_number = driver15.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235412")
# Please choose what you want to consult
select = Select(driver15.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver15.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver14 = webdriver.Chrome()
wait = WebDriverWait(driver14, 30)
driver14.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
username = driver14.find_element_by_id ("username")
username.send_keys ("testagent3@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
driver14.find_element_by_xpath (Continue).click()
time.sleep(3)
pwd = driver14.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
driver14.find_element_by_xpath (Connect).click()
element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver14.find_element_by_class_name ("buttonTour").click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver2.find_element_by_xpath (endChat).click()
time.sleep(3)
driver2.quit()
time.sleep(1)

driver16 = webdriver.Chrome ()
driver16.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver16.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver16.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon13")
# Input Last Name
last_name = driver16.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim13")
# Input Phone Number
phone_number = driver16.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235413")
# Please choose what you want to consult
select = Select(driver16.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Tablet")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver16.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver17 = webdriver.Chrome()
wait = WebDriverWait(driver17, 30)
driver17.get ('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
username = driver17.find_element_by_id ("username")
username.send_keys ("testagent6@test.com")
time.sleep(3)
Continue = '/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div'
driver17.find_element_by_xpath (Continue).click()
time.sleep(3)
pwd = driver17.find_element_by_id ("authPwd")
pwd.send_keys ("!2345Abcde")
Connect = "/html/body/div[2]/authentication-component/authentication-window-component/div/div[1]/div[2]/div[2]/authentication-window-content/div/authentication-form-component/form/square-button/div/div/span[2]"
driver17.find_element_by_xpath (Connect).click()
element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "buttonTour")))
time.sleep(1)
driver17.find_element_by_class_name ("buttonTour").click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver6.find_element_by_xpath (endChat).click()
time.sleep(3)
driver6.quit()
time.sleep(1)

driver18 = webdriver.Chrome ()
driver18.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver18.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver18.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon14")
# Input Last Name
last_name = driver18.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim14")
# Input Phone Number
phone_number = driver18.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235414")
# Please choose what you want to consult
select = Select(driver18.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver18.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver19 = webdriver.Chrome ()
driver19.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver19.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver19.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon15")
# Input Last Name
last_name = driver19.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim15")
# Input Phone Number
phone_number = driver19.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235415")
# Please choose what you want to consult
select = Select(driver19.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Computer")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver19.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

driver20 = webdriver.Chrome ()
driver20.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver20.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver20.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon16")
# Input Last Name
last_name = driver20.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim16")
# Input Phone Number
phone_number = driver20.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235416")
# Please choose what you want to consult
select = Select(driver20.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver20.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver7.find_element_by_xpath (endChat).click()
time.sleep(3)
driver7.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver4.find_element_by_xpath (endChat).click()
time.sleep(3)
driver4.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver10.find_element_by_xpath (endChat).click()
time.sleep(3)
driver10.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver15.find_element_by_xpath (endChat).click()
time.sleep(3)
driver15.quit()
time.sleep(1)

driver21 = webdriver.Chrome ()
driver21.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver21.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver21.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon17")
# Input Last Name
last_name = driver21.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim17")
# Input Phone Number
phone_number = driver21.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235417")
# Please choose what you want to consult
select = Select(driver21.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver21.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver9.find_element_by_xpath (endChat).click()
time.sleep(3)
driver9.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver13.find_element_by_xpath (endChat).click()
time.sleep(3)
driver13.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver8.find_element_by_xpath (endChat).click()
time.sleep(3)
driver8.quit()
time.sleep(1)

driver22 = webdriver.Chrome ()
driver22.get ('https://escproject.sutd.org/')
time.sleep(3)
# Click Live Chat
Live_Chat ='/html/body/div/div/button'
driver22.find_element_by_xpath (Live_Chat).click()
# Input First Name
first_name = driver22.find_element_by_xpath ("/html/body/div/div/input[1]")
first_name.send_keys ("Chaewoon18")
# Input Last Name
last_name = driver22.find_element_by_xpath ("/html/body/div/div/input[2]")
last_name.send_keys ("Kim18")
# Input Phone Number
phone_number = driver22.find_element_by_xpath ('/html/body/div/div/input[3]')
phone_number.send_keys("94235418")
# Please choose what you want to consult
select = Select(driver22.find_element_by_xpath("/html/body/div/div/select"))
select.select_by_visible_text("Phone")
time.sleep(3)
Start_Chatting = '/html/body/div/div/button'
driver22.find_element_by_xpath (Start_Chatting).click()
time.sleep (2)

endChat = "/html/body/div/div/div[1]/button"
driver11.find_element_by_xpath (endChat).click()
time.sleep(3)
driver11.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver18.find_element_by_xpath (endChat).click()
time.sleep(3)
driver18.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver16.find_element_by_xpath (endChat).click()
time.sleep(3)
driver16.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver12.find_element_by_xpath (endChat).click()
time.sleep(3)
driver12.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver19.find_element_by_xpath (endChat).click()
time.sleep(3)
driver19.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver21.find_element_by_xpath (endChat).click()
time.sleep(3)
driver21.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver22.find_element_by_xpath (endChat).click()
time.sleep(3)
driver22.quit()
time.sleep(1)

endChat = "/html/body/div/div/div[1]/button"
driver20.find_element_by_xpath (endChat).click()
time.sleep(3)
driver20.quit()
time.sleep(1)

driver.quit()
time.sleep(1)

driver5.quit()
time.sleep(1)

driver14.quit()
time.sleep(1)

driver17.quit()
time.sleep(1)