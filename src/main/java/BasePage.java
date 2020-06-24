import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class BasePage {

    private String baseURL = "https://localhost:5001/";
    private WebDriver driver = WebDriverManager.getDriver();
    private WebDriverWait wait = new WebDriverWait(driver, 2);
    private String username = System.getenv("UserName");
    private String password = System.getenv("PASSWORD");


    public void navigate() {
        driver.navigate().to(baseURL);
    }

    public String getBaseURL() {
        return baseURL;
    }

    public WebDriver getDriver() {

        return driver;
    }

    public WebDriverWait getWait() {
        return wait;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void waitForAjaxControls(int timeoutInSeconds) {
        System.out
                .println("Querying active AJAX controls by calling jquery.active");
        try {
            if (driver instanceof JavascriptExecutor) {
                JavascriptExecutor jsDriver = (JavascriptExecutor) driver;
                for (int i = 0; i < timeoutInSeconds; i++) {
                    Object numberOfAjaxConnections = jsDriver
                            .executeScript("return jQuery.active");
                    // return should be a number
                    if (numberOfAjaxConnections instanceof Long) {
                        Long n = (Long) numberOfAjaxConnections;
                        System.out
                                .println("Number of active jquery AJAX controls: "
                                        + n);
                        if (n.longValue() == 0L)
                            break;
                    }
                    Thread.sleep(1000);
                }
            } else {
                System.out.println("Web driver: " + driver
                        + " can't run javascript.");
            }
        } catch (InterruptedException e) {
            System.out.println(e);
        }
    }
}