from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import datetime, timedelta
from selenium.webdriver.support.ui import Select
import time
import random
import logging

chrome_options = Options()

# Run Chrome in headless mode (no UI)
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")  # For shared memory issues
chrome_options.add_argument("--no-sandbox")  # To prevent issues on certain Linux systems

driver = webdriver.Chrome(options=chrome_options)
print("Driver starts...")

log_filename = f"error_logs_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.txt"

logging.basicConfig(
    filename=log_filename,
    level=logging.ERROR,
)
url_log = {"previous": None, "current_function": None, "status": None}

def update_previous_url(function_name, status_message):
    url_log["previous"] = driver.current_url  # Store last successful page
    url_log["current_function"] = function_name  # Store function name for tracking
    url_log["status"] = status_message  # Store function status message
    print(f"Running function: {function_name} - Status: {status_message}")

def book_talent():
    update_previous_url("book_talent", "Attempting to book talent.")
    print("Waiting for 'Book a Talent Now' button...")
    book_talent_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Book a Talent Now')]"))
    )
    print("Button found, clicking it...")
    book_talent_button.click()
    time.sleep(2)
    url_log["status"] += " -> Adding Event"

def select_location():
    update_previous_url("select_location", "Selecting Location")
    # Wait for the search bar on the next page
    print("Waiting for the location page...")
    search_bar = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//input[@placeholder=\"Enter your event's location\"]")
        )
    )
    # Type into the search bar
    print("Typing into the search bar...")
    search_bar.send_keys("90068")  # Replace with your desired input
    print("Search bar interaction successful!")
    time.sleep(2)

    # Wait for the map box suggestion list to appear
    print("Waiting for map box suggestion list...")
    suggestion = WebDriverWait(driver, 20).until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'Suggestion') and contains(text(), 'Los Angeles, California 90068')]"))
    )
    print("Clicking on the map box suggestion...")
    suggestion.click()
    print("Map box suggestion selected successfully!")
    time.sleep(1)

    # Clicking on continue button
    print("Clicking on 'Continue'...")
    location_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Continue']"))
    )
    location_button.click()
    print("Continued...")
    time.sleep(2)
    url_log["status"] += " -> Location Selected"

def date_time():
    update_previous_url("date_time", "Selecting Date & Time")
    print("Waiting for date & time page")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'When is your event?')]"))
    )
    print("load successfully!")
    time.sleep(2)

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2) 

    print("Waiting for 'Pick a date' button")
    pick_date_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[text()='Pick a date']/ancestor::button"))
    )
    print("Button found, clicking it...")
    pick_date_button.click()
    time.sleep(1)

    print("select a date")
    current_date = datetime.now()
    new_date = current_date + timedelta(days=2)
    day_only = new_date.day
    print(f"Today's date: {day_only}")
    
    date_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, f"//button[contains(@class, 'rdp-button') and @role='gridcell' and not(@disabled) and text()='{day_only}']"))
    )
    date_button.click()
    print("date selected... ")
    time.sleep(1)

    print("select start time")
    start_time_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button//span[text()='Select start time']"))
    )
    start_time_button.click()
    print("open drop down")
    time.sleep(1)

    # Wait for the <ul> element and scroll it
    print("scrolling drop down")
    ul_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//ul[contains(@class, 'absolute w-full mt-1 py-[4px] px-[8px]')]"))
    )

    # Scroll the <ul> element using JavaScript
    driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", ul_element)
    time.sleep(1)
    print("selecting time")
    time_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[text()='10:00']"))
    )
    time_button.click()
    print("time 10:00 selected!")
    time.sleep(1)

    print("select time duration")
    time_duration_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button//span[text()='Select no. of hours']"))
    )
    time_duration_button.click()
    print("open drop down")
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1) 
    print("scroll dropdown")
    new_ul_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//ul[contains(@class, 'absolute') and contains(@class, 'py-[4px]') and contains(@class, 'px-[8px]')]"))
    )
    driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", new_ul_element)
    time.sleep(1)

    print("selecting hours")
    duration_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[text()='6 hours']"))
    )
    duration_button.click()
    print("hours selected...")
    time.sleep(1)

    print("Clicking on 'Continue' button of date & time page...")
    date_time_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Continue']"))
    )
    date_time_button.click()
    print("Continued...")
    time.sleep(3)
    url_log["status"] += " -> Date & Time selected"

def service_details():
    update_previous_url("service_details", "Adding Service Details")
    print("Service details page")
    # Wait for the host input field to be present
    host_input_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Hosting a corporate event.']"))
    )
    print("Clicking on the host input field...")
    host_input_field.click()
    time.sleep(1)

    print("Writing into the input field...")
    host_input_field.send_keys("Complete Automate test cycle on New Updone")
    print("Text entered successfully!")
    time.sleep(2)

    # Wait for the input field to be present
    event_input_field = WebDriverWait(driver, 10).until(
         EC.presence_of_element_located((By.XPATH, "//textarea[@placeholder=\"I’m expecting 30 - 40 guests at my event. Looking to hire a professional and well dressed bartender.\"]"))
    )
    print("Clicking on the event details input field...")
    event_input_field.click()
    time.sleep(1)

    print("Writing the event details")
    event_input_field.send_keys("Automation testing on event details input fields")
    print("Details entered successfully!")
    time.sleep(2)

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2) 

    print("Randomly select service")
    services = ["Promo Model", "Bartender", "Waiter", "Cocktail Server", "Event Helper", "Barback"]
    random_service = random.choice(services)
    select_service= WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, f"//div[contains(@class, 'cursor-pointer') and .//span[text()='{random_service}']]")
        )
    )

    print(f"Selected service '{random_service}'...")
    select_service.click()
    print("Service selected.......")
    time.sleep(2)

    print("Clicking on 'Continue' button of service details page...")
    service_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Continue']"))
    )
    service_button.click()
    print("Continued...")
    time.sleep(3)
    url_log["status"] += " -> Service Details Added"

def login():
    update_previous_url("login", "Login To Post Event")
    print("Entering Credientials")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("jahanzaib.baig01@gmail.com")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys("Test@123")
    # WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("jahanzaib.baig01@gmail.com")
    # WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys("Jazzy@123")

    login_submit_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    print("Clicking login button inside modal...")
    login_submit_button.click()
    print("Logged in successfully..")
    time.sleep(3)
    url_log["status"] += " -> Logged in Successfully"

def signup():
    update_previous_url("signup", "Sign up to post Event")
    print("Click on register")
    register_button = driver.find_element(By.CLASS_NAME, "login_register_btn__5LsJs")
    register_button.click()
    time.sleep(2)
    print("Entering information to register..")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "name"))).send_keys("Beyg Jahanzaib")
    print("Name Done")
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("jahanzaib.baig01@gmail.com")
    print("Email Done")
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "company"))).send_keys("Testing Cosmo Inc.")
    print("Company Done")
    time.sleep(1)
    country_selector = driver.find_element(By.CLASS_NAME, "react-international-phone-country-selector-button__button-content")
    country_selector.click()
    time.sleep(1)
    country_selector.click()
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "phoneNumber"))).send_keys("2345214960")
    print("hone Number Done")
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys("Jazzy@123")
    print("Password Done")
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "confirmPassword"))).send_keys("Jazzy@123")
    print("Confirm Password Done")
    time.sleep(1)

    div = driver.find_element(By.XPATH, "//div[@class='overflow-auto overflow-scroll relative bottom-[420px] pb-[40px] h-[756px] left-[64px]']")
    driver.execute_script("arguments[0].scrollTop += 100", div)
    print("Scrolling the form to click register button")
    time.sleep(2)

    button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    button.click()
    print("registered...")
    time.sleep(3)
    url_log["status"] += " -> Sign Up successfully"

def select_talent(driver, talent_name, next_page_xpath, page_limit):
    current_page = 1

    while current_page <= page_limit:
        try:
            print(f"Searching for {talent_name} on page {current_page}...")
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            for _ in range(2):  
                try:
                    talent = WebDriverWait(driver, 5).until(
                        EC.element_to_be_clickable((By.XPATH, f"//h3[text()='{talent_name}']"))
                    )
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", talent)
                    time.sleep(1)  
                    talent.click()
                    print(f"✅ Selected talent: {talent_name}")
                    return True  
                except Exception:
                    driver.execute_script("window.scrollBy(0, 300);")
                    time.sleep(1)

            try:
                next_page_button = WebDriverWait(driver, 5).until(
                    EC.element_to_be_clickable((By.XPATH, next_page_xpath))
                )
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", next_page_button)
                time.sleep(1)
                next_page_button.click()
                print(f"Clicked on 'Next' button for page {current_page + 1}.")
                time.sleep(3) 
                driver.execute_script("window.scrollTo(0, 0);")
                time.sleep(2)
                current_page += 1
            except Exception:
                print(f"❌ No more pages or next button not found. Stopping search for {talent_name}.")
                break

        except Exception as e:
            print(f"❌ Error searching for talent {talent_name} on page {current_page}: {e}")
            break

    print(f"❌ Failed to find talent: {talent_name} after checking {page_limit} pages.")
    return False

def invite_talent(driver):
    update_previous_url("invite_talent", "Inviting/Selecting talents for an Event")
    print("📄 Invite Talent page loading....")
    driver.execute_script("window.scrollTo(0, 0);")  
    talents_to_select = ["Omar L.", "Tom L.", "Jawad A.", "Jay N.", "Ty C."]
    next_page_xpath = "//div[contains(@class, 'px-4 py-1') and contains(@class, 'cursor-pointer')]"
    page_limit = 5

    selected_talents = []

    for talent_name in talents_to_select:
        if select_talent(driver, talent_name, next_page_xpath, page_limit):
            selected_talents.append(talent_name)
        else:
            print(f"⚠️ Warning: Could not select {talent_name}.")
        time.sleep(2)  

    if selected_talents:
        print(f"✅ Successfully selected: {', '.join(selected_talents)}")
    else:
        print("❌ No talents were selected.")

    try:
        print("Clicking on Confirm details..")
        confirm_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Confirm Event Details')]")
        confirm_button.click()
        print("🎉 Clicked on 'Confirm Event Details' button successfully!")
        time.sleep(2)
    except Exception:
        print("❌ Could not click 'Confirm Event Details'. Check if the button is visible.")

    time.sleep(2)
    
    # register()
    login()

    container = driver.find_element(By.XPATH, "//div[@class='bg-white px-6 pb-6 rounded-lg shadow-lg h-full overflow-y-auto flex flex-col']")
    driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", container)
    time.sleep(2)

    post_event_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[normalize-space()='Post Event']"))
    )
    print(post_event_button)
    post_event_button.click()
    print("✅ Event posted successfully!")
    time.sleep(15)
    url_log["status"] += " -> Event Posted After Selecting Talents"

def talent_login():
    update_previous_url("talent_login", "Talent login to make an offer")
    print("Talent Login")
    wait = WebDriverWait(driver, 15)

    email_input = wait.until(EC.element_to_be_clickable((By.XPATH, "(//input[@id='email'])[2]")))
    email_input.send_keys("jahanzaibbaig+804@cosmoinc.co")

    password_input = wait.until(EC.element_to_be_clickable((By.XPATH, "(//input[@id='password'])[2]")))
    password_input.send_keys("Glow2896>")

    login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "(//button[@type='submit'][normalize-space()='Log in'])[2]")))
    login_button.click()
    print("Talent Logged in successfully")
    time.sleep(3)
    url_log["status"] += " -> Talent Logged in Successfully"

def submit_offer():
    update_previous_url("submit_offer", "Talent submitting an Offer")
    print("unchecking default rate")
    checkbox = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "(//input[@type='checkbox'])[2]"))
    )
    checkbox.click()
    print("Checkbox is unchecked.")
    time.sleep(2)

    print("Entering custom rate...")
    input_field = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div/div/div/div/div/div[1]/div/div[1]/div/input"))
    )
    input_field.send_keys("35")  
    print("Entered custom rate")
    time.sleep(2)

    print("Writing an opening message..")
    textarea_xpath = "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div/div/div/div/div/div[1]/div/div[2]/textarea"
    textarea = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, textarea_xpath))
    )
    textarea.send_keys("Hello, I am available to assist with your event. Looking forward to work with you!")  
    print("Entered opening message")
    time.sleep(2)

    print("Submitting an offer... ")
    submit_button_xpath = "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div/div/div/div/div/div[1]/div/div[3]/button"
    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, submit_button_xpath))
    )
    submit_button.click()
    print("Submit Offer button clicked.")
    time.sleep(5)
    url_log["status"] += " -> Offer Submitted Successfully"

def hire_talent():
    # driver.refresh()
    # print("Refreshing event detail page")
    # time.sleep(5)
    update_previous_url("hire_talent", "Client Hiring an Talent for an event")
    print("Finding recent open event....")
    cross_icon = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//body//div//div//div//div//main//div//div//div//img[@alt='cross icon']"))
    )
    cross_icon.click()
    time.sleep(2)   
    open_element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//body[1]/div[1]/div[1]/div[3]/div[2]/main[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]/div[1]/div[1]"))
    )
    open_element.click()
    print("Successfully clicked on the first row.")
    time.sleep(5)

    print("clicking on chat....")
    chat_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//main[contains(@class, 'w-')]//div[contains(@class, 'relative gap-2 group cursor-pointer border border-1 h-')]"))
    )
    chat_button.click()
    print("Successfully clicked on chat button.")
    time.sleep(2)

    print("Writing some comments.. ")
    comment_box = driver.find_element(By.XPATH, "//input[@placeholder='Add your comment here...']")
    comment_box.click()
    time.sleep(1)
    comment_box.send_keys("I am looking for professional staff to serve buffet food.")
    time.sleep(1)
    print("Comment written")

    send_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//img[@alt='Send']"))
    )
    send_button.click()
    print("Comment sent...")
    time.sleep(3)

    close_button = driver.find_element(By.XPATH, "//img[@alt='close-img']")
    close_button.click()
    print("Closed chat")
    time.sleep(3)

    hireMe_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Hire Me')]")
    time.sleep(1)
    driver.execute_script("arguments[0].click();", hireMe_button)
    print("Hire button clicked...")
    time.sleep(5)
    url_log["status"] += " -> Can't hire talent due to Stripe Iframe "

def event_details():
    update_previous_url("event_details", "Checking Event Details")
    print("Event section.. ")
    cross_icon = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//body//div//div//div//div//main//div//div//div//img[@alt='cross icon']"))
    )
    cross_icon.click()
    time.sleep(2)    

    print("Finding recent open event....")
    open_element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//body[1]/div[1]/div[1]/div[3]/div[2]/main[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]/div[1]/div[1]"))
    )
    open_element.click()
    print("Successfully clicked on the first row.")
    time.sleep(5)
    update_previous_url("event_details", "Event Details page")

    current_url = driver.current_url
    print(f"get the current URL:{current_url}")
    num_id = current_url.split("/")[-1]

    event_url = 'https://qa-talentpro.updone.com/staff/job-detail/'
    offer_url = event_url + num_id
    print(offer_url)
    time.sleep(2)

    logout()

    driver.execute_script(f"window.open('{offer_url}', '_blank');")
    print("Opened the URL in a new tab.")

    original_window = driver.current_window_handle

    driver.switch_to.window(driver.window_handles[-1])
    print("Switched to the new tab.")
    time.sleep(5)

    talent_login()
    submit_offer()

    driver.close()
    print("Closed the new tab.")

    driver.switch_to.window(original_window)
    print("Switched back to the previous screen.")
    time.sleep(5)

def logout():
    update_previous_url("logout", "Logging out for Talent submit an Offer")
    print("clicking on logout button")
    logout_button = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[2]/div[2]/div/div[3]/ul/li[1]/button")
    logout_button.click()
    print("Logout button clicked from Side Bar.")
    time.sleep(5)
    url_log["status"] += " -> Client Logged out Successfully"

def client_login():
    update_previous_url("client_login", "Client Login again to hire a Talent")
    print("Waiting for login button...")
    login_button = driver.find_element(By.XPATH, "//a[normalize-space()='Log in']")
    login_button.click()
    print("Login button found, clicking it...")
    time.sleep(2)

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("jahanzaibbaig111@gmail.com")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys("Unity1806=")
    time.sleep(2)

    login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    print("Clicking login")
    login_button.click()
    time.sleep(3)
    url_log["status"] += " -> Logged in Successfully."

## TalentPro New Flow

def new_talent_flow():
    update_previous_url("new_talent_login", "Talent Login again view its recent open invites, offers and update services rate")
    url = "https://qa.updone.com/"
    driver.execute_script(f"window.open('{url}', '_blank');")
    print("Opened the URL in a new tab.")

    original_window = driver.current_window_handle

    driver.switch_to.window(driver.window_handles[-1])
    print("Switched to the new tab.")
    time.sleep(5)

    print("Waiting for login button...")
    login_button = driver.find_element(By.XPATH, "//a[normalize-space()='Log in']")
    login_button.click()
    print("Login button found, clicking it...")
    time.sleep(2)

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email"))).send_keys("jahanzaibbaig+804@cosmoinc.co")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password"))).send_keys("Glow2896>")
    time.sleep(2)

    login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    print("Clicking login")
    login_button.click()
    time.sleep(8)
    
    open_invites()
    talent_offers()
    my_events()
    Talent_personal_details()
    login_details()
    update_services()
    talent_payment()
    

    driver.close()
    print("Closed the new tab.")
    driver.switch_to.window(original_window)
    print("Switched back to the previous screen.")
    url_log["status"] += " -> Talent flow completed Successfully."

def talent_offers():
    update_previous_url("talent_offers", "Talent view his recent submitted offer.")
    print("My offers")
    my_offers = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "My Offers")]'))
    )
    my_offers.click()
    print("Clicked on 'My Offers' successfully!")
    time.sleep(3)
    view_offer_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[7]/div/div[1]/p'))
    ) 
    view_offer_button.click()
    print("Successfully clicked on 'View Offer' button!")
    time.sleep(5)
    url_log["status"] += " -> View My offers Successfully."

def open_invites():
    update_previous_url("open_invites", "Talent view his invites to an event")
    print("Open Invites")
    my_offers = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "Open Invites")]'))
    )
    my_offers.click()
    print("Clicked on 'Invites' successfully!")
    time.sleep(3)
    make_offer_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[7]/div/div'))
    )
    make_offer_button.click()
    print("Successfully clicked on 'Make an Offer' button!")
    time.sleep(5)
    submit_offer()
    url_log["status"] += " -> View Open Invites and make an offer Successfully."

def update_services():
    update_previous_url("update_services", "Talent updates his services rate")
    print("Open Services")
    my_offers = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//span[text()='Services']"))
    )
    my_offers.click()
    print("Clicked on 'Service' successfully!")
    time.sleep(3)
    edit_button = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/button/span")
    edit_button.click()
    print("Clicked on 'Edit button' successfully!")
    time.sleep(1)
    print("update the services rate")
    random_number = random.randint(1, 6)
    
    print(f"Random Number selected: {random_number}" ) 
    rate_xpath = f"/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/ul/li[{random_number}]/div/div/input"
    rate_input = driver.find_element(By.XPATH, rate_xpath)
    driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", rate_input)
    rate_input.click()
    rate_input.clear()
    rate_input.send_keys("38")
    time.sleep(1)

    save_button = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[4]/button[2]")
    save_button.click()
    print("Saved the Rate")
    time.sleep(5)
    
    url_log["status"] += " -> Update Services rate Successfully."

def Talent_personal_details():
    update_previous_url("Talent_personal_details", "Talent view his personal details")
    print("Personal details")
    personal_details = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//span[text()='Personal Details']"))
    )
    personal_details.click()
    print("Clicked on 'personal details' successfully!")
    time.sleep(5)
    edit_button = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[1]/div/span")
    edit_button.click()
    print("Edit button click Successfully")
    time.sleep(1)

    name_field = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[2]/div[1]/input")
    name_field.click()
    name_field.clear()
    name_field.send_keys("Tom Lat")
    time.sleep(1)

    select_location = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[2]/div[4]/select")
    select_location.click() 
    dropdown = Select(select_location)
    location = ["Manhattan", "Beverly Hills", "Gardena", "Palmdale", "Los Angeles", "New York City"]
    random_location = random.choice(location)
    dropdown.select_by_visible_text(f"{random_location}")
    print(f"Successfully selected {random_location}!")
    time.sleep(2)

    phone_field = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[2]/div[3]/div/input")
    phone_field.click()
    phone_field.send_keys("\ue003" * 10) 
    time.sleep(1)
    phone_field.send_keys("8006901342")
    time.sleep(2)

    save_button = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[3]/button")
    save_button.click()
    print("Saved personal Details")
    time.sleep(5)
    url_log["status"] += " -> View Personal Details and Edit name Successfully."

def login_details():
    update_previous_url("login_details", "Talent view his login details")
    print("login details")
    login_details = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//span[text()='Login Details']"))
    )
    login_details.click()
    print("Clicked on 'login details' successfully!")
    time.sleep(5)
    url_log["status"] += " -> View login details Successfully."

def my_events():
    update_previous_url("my_events", "Talent view his completed events")
    print("my events")
    my_events = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "My Events")]'))
    )
    my_events.click()
    print("Clicked on 'login details' successfully!")
    time.sleep(2)

    view_details = driver.find_element(By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[1]/div[7]/div/div/p')
    view_details.click()
    print("Clicked on 'view_details' successfully!")
    time.sleep(5)

    

    # release_payment = driver.find_element(By.XPATH,"/html/body/div[1]/div/div[3]/div[3]/main/div/div/div/div/div/div/div/div[2]")
    # release_payment.click()
    # print("Clicked on 'view_upcoming_events' successfully!")
    # time.sleep(5)

    url_log["status"] += " -> View 'My Events' Successfully."

def talent_payment():
    update_previous_url("talent_payment", "Talent view his payments status")
    print("login details")
    talent_payment = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//span[text()='Payments']"))
    )
    talent_payment.click()
    print("Clicked on 'Payments' successfully!")
    time.sleep(1)

    pending = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[2]/div[1]/div[2]'))
    )
    pending.click()
    print("Clicked on 'pending' successfully!")
    time.sleep(2)

    requested = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[2]/div[1]/div[3]'))
    )
    requested.click()
    print("Clicked on 'requested' successfully!")
    time.sleep(2)

    approved = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div/div[3]/div/div[3]/main/div/div[2]/div[2]/div[1]/div[4]'))
    )
    approved.click()
    print("Clicked on 'approved' successfully!")

    time.sleep(5)
    url_log["status"] += " -> View Payments Successfully."

try:
    # Open the website
    print("Opening website...")
    driver.get("https://qa.updone.com/")
    driver.maximize_window()
    time.sleep(3)

    #Updone Flow

    # book_talent()
    # select_location()
    # date_time()
    # service_details()
    # invite_talent(driver)
    # event_details()
    # client_login()
    # hire_talent()

    #TalentPro New Flow
    book_talent()
    select_location()
    date_time()
    service_details()
    invite_talent(driver)
    logout()
    new_talent_flow()

    print("Test cycle Passed.....")

except Exception as e:
    previous_url = url_log.get("previous", "Unknown")  # Get last successful URL
    current_url = driver.current_url  # Get the current failing URL
    function_name = url_log.get("current_function", "Unknown Function")  # Get function name
    status = url_log.get("status", "No status recorded.")  # Get function status

    error_message = str(e)

    log_message = (
        f"\nDate --> {time.strftime('%Y-%m-%d %H:%M:%S')}"
        f"\nFunction --> {function_name}"
        f"\nStatus --> {status}"
        f"\nPrevious URL --> {previous_url}"
        f"\nCurrent URL --> {current_url}"
        f"\nError --> Element Not found or interactable"
        f"\n\nException Error: {error_message}\n"
    )
    logging.error(log_message)

    print(log_message) 


finally:
    driver.quit()
    print("Driver closed.")

    

