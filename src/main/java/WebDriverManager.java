import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class WebDriverManager {

    private static WebDriver driver = new ChromeDriver();
    private static String gridUrl = "http://localhost:4444/wd/hub";


    private WebDriverManager() {
    }

    public static WebDriver getDriver() {
        System.setProperty("webdriver.chrome.driver", "/src/test/resources/chromedriver1");
        driver.manage().window().maximize();
        return driver;
    }

    public static WebDriver getDriver1() {
        if (driver == null) {
            try {
                System.setProperty("webdriver.gecko.driver", "/src/test/resources/geckodriver1");
                DesiredCapabilities capabilities = DesiredCapabilities.firefox();
                capabilities.setBrowserName("firefox");
                capabilities.setPlatform(Platform.LINUX);
                driver = new RemoteWebDriver(new URL(gridUrl), capabilities);
            } catch (MalformedURLException e) {
                e.fillInStackTrace();
            }
        }
        driver.manage().window().maximize();
        return driver;
    }

    public static WebDriver initDriver() {
        if (driver != null) {
            return driver;
        } else {
            System.setProperty("webdriver.chrome.driver", "/src/test/resources/chromedriver1");
            driver = new ChromeDriver();
        }
        return driver;
    }

    public static void quit() {
        driver.quit();
        driver = null;
    }
}