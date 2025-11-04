import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class homeController {

    @GetMapping("/")
    public String getMethodName(@RequestParam String param) {
        return "index";
    }
    

}
