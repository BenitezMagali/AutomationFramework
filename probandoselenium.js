const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, Key } = require('selenium-webdriver');

corriendoprueba();

async function corriendoprueba() {
    var driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    await driver.get("https://www.linkedin.com/home");
    var personas= await driver.findElement(By.xpath("//a[contains(text(),'Encuentra a personas que conoces')]"));
    await personas.sendKeys(Key.ENTER).perform();
    var nombre= await driver.findElement(By.xpath("//input[@name='firstName']"));
    await nombre.sendKeys("Magalí");
    var apellido= await driver.findElement(By.xpath("//header/nav[1]/section[1]/section[1]/form[1]/section[2]/input[1]"));
    await apellido.sendKeys("Benitez");
    var buscar= await driver.findElement(By.xpath("//header/nav[1]/section[1]/section[1]/form[1]/button[1]"))
    await buscar.sendKeys(Key.ENTER).perform();
}