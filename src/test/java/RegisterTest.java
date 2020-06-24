import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RegisterTest extends Initialization{

    private HomePage homePage = new HomePage();

    @BeforeEach
    public void setup(){
        homePage.navigate();
    }

    @Test
    public void register(){
        homePage.fillRegisterName();
        homePage.fillRegisterPassword();
        homePage.fillRegisterConfirmPassword();
        homePage.clickOnRegisterButton();
    }
}
