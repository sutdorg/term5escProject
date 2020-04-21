import time

from joblib import Parallel, delayed
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import Select

options = Options()
options.add_argument("--headless")


# options.add_argument("--start-minimized")
# options.add_argument("--disable-notifications")
# options.add_argument("--incognito")


def do_stuff(i):
    driver = webdriver.Firefox(options=options)
    url = "https://escproject.sutd.org/"
    driver.get(url)
    Live_Chat = '/html/body/div/div/button'
    driver.find_element_by_xpath(Live_Chat).click()
    first_name = driver.find_element_by_xpath("/html/body/div/div/input[1]")
    first_name.send_keys("Seyong")
    last_name = driver.find_element_by_xpath("/html/body/div/div/input[2]")
    last_name.send_keys("Park" + str(i))
    phone_number = driver.find_element_by_xpath('/html/body/div/div/input[3]')
    phone_number.send_keys("93915827")
    select = Select(driver.find_element_by_xpath("/html/body/div/div/select"))
    select.select_by_visible_text("Tablet")
    Start_Chatting = '/html/body/div/div/button'
    driver.find_element_by_xpath(Start_Chatting).click()
    time.sleep(3)
    driver.close()


Parallel(n_jobs=-1)(delayed(do_stuff)(i) for i in range(10))
