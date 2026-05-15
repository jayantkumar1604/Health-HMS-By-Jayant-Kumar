package Interfaces.MultipleInheritanceAchieve;

public class Test {
    public static void main(String[] args) {
        SmartPhone smartPhone = new SmartPhone();
        smartPhone.makeCall("123");
        smartPhone.endCall();
        smartPhone.recordVideo();
        smartPhone.takePhoto();
        smartPhone.playMusic();
        smartPhone.stopMusic();
    }
}
