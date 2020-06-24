import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LoginTest extends Initialization{

    private HomePage homePage = new HomePage();

    @BeforeEach
    public void setup(){
        homePage.navigate();
        homePage.registerWithValidData();
    }

    @Test
    public void login(){
        homePage.fillLoginName();
        homePage.fillLoginPassword();
        homePage.clickOnLogin();
    }
}
