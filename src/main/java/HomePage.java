import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage extends BasePage {

    private WebDriver driver;
    private WebDriverWait wait;
    @FindBy(css = ".registerDiv #Name")
    private WebElement registerName;
    @FindBy(css = ".registerDiv #Password")
    private WebElement registerPassword;
    @FindBy(css = ".registerDiv #ConfirmPassword")
    private WebElement registerConfirmPassword;
    @FindBy(xpath = "//button[text()='Register']")
    private WebElement registerButton;
    @FindBy(css = ".loginDiv #Name")
    private WebElement loginName;
    @FindBy(css = ".loginDiv #Password")
    private WebElement loginPassword;
    @FindBy(xpath = "//button[text()='Login']")
    private WebElement loginButton;

    public HomePage() {
        this.driver = getDriver();
        this.wait = getWait();
        PageFactory.initElements(driver, this);
    }

    public void registerWithValidData(){
        fillRegisterName();
        fillRegisterPassword();
        fillRegisterConfirmPassword();
        clickOnRegisterButton();
    }

    public void fillRegisterName(){
        registerName.sendKeys("Balázs");
    }

    public void fillRegisterPassword(){
        registerPassword.sendKeys("Balázs");
    }

    public void fillRegisterConfirmPassword(){
        registerConfirmPassword.sendKeys("Balázs");
    }

    public void clickOnRegisterButton(){
        registerButton.click();
    }

    public void fillLoginName(){
        loginName.sendKeys("Balázs");
    }

    public void fillLoginPassword(){
        loginPassword.sendKeys("Balázs");
    }

    public void clickOnLogin(){
        loginButton.click();
    }
}