const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, Key } = require('selenium-webdriver');
const { assert } = require('chai');
setDefaultTimeout(60000);
var driver;

Given('Abro el navegador en la pagina principal', async function () {
    //Todo lo que vaya escribiendo acá se va a ejecutar desde la feature
    driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .build();
    await driver.manage().window().maximize();
    await driver.get("https://www.linkedin.com/home");
    await driver.sleep(3000)
    var personas = await driver.findElement(By.xpath("//a[contains(text(),'Encuentra a personas que conoces')]"));
    await personas.sendKeys(Key.ENTER);
    await driver.sleep(5000)

})
When('Busco personas', async function () {
    var nombre = await driver.findElement(By.xpath("//input[@name='firstName']"));
    await nombre.sendKeys("Magalí");
    var apellido = await driver.findElement(By.xpath("//header/nav[1]/section[1]/section[1]/form[1]/section[2]/input[1]"));
    await apellido.sendKeys("Benitez");
    var buscar = await driver.findElement(By.xpath("//header/nav[1]/section[1]/section[1]/form[1]/button[1]"))
    await buscar.sendKeys(Key.ENTER);
    var encontrado= await driver.findElement(By.xpath("//body/div[1]/div[1]/main[1]/section[1]/ul[1]/li[1]/a[1]/div[2]/h3[1]"));
    await encontrado.click();
})
Then('verifico que el nombre y apellido sea correcto', async function(){
    await driver.sleep(3000)
    var nombreEncontrado= await driver.findElement(By.xpath("//h1[contains(text(),'Magalí Benitez')]")).getText();
    assert.isTrue(nombreEncontrado.includes("Magalí Benitez"));

})