import time


def rainbow_login(driver, email, password):
    driver.get('https://web-sandbox.openrainbow.com/app/1.69.3/index.html')
    time.sleep(5)

    username = driver.find_element_by_id("username")
    username.send_keys(email)
    Continue = driver.find_element_by_xpath("/html/body/div[2]/authentication-component/authentication-window-component"
                                            "/div/div[1]/div[2]/div["
                                            "2]/authentication-window-content/div/authentication-form-component/form"
                                            "/square-button/div/div")
    time.sleep(5)
    Continue.click()

    time.sleep(3)

    pwd = driver.find_element_by_id("authPwd")
    pwd.send_keys(password)
    Connect = driver.find_element_by_xpath("/html/body/div[2]/authentication-component/authentication-window-component"
                                           "/div/div[1]/div[2]/div["
                                           "2]/authentication-window-content/div/authentication-form-component/form"
                                           "/square-button/div/div/span[2]")
    time.sleep(5)
    Connect.click()
