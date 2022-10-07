# main-CarScheduling
5. 차량 출입 스케쥴링 기능


## 파일 구조도

📦main-CarScheduling <br/>
 ┣ 📂office <br/>
 ┃ ┣ 📂arduino <br/>
 ┃ ┃ ┗ 📂barrier <br/>
 ┃ ┃ ┃ ┗ 📜barrier.ino <br/>
 ┃ ┗ 📂car-detection <br/>
 ┃ ┃ ┣ 📂car-detection_app <br/>
 ┃ ┃ ┗ 📂car-detection_service <br/>
 ┣ 📂wallpad <br/>
 ┃ ┗ 📂register-car <br/>
 ┃ ┃ ┣ 📂register-car_app <br/>
 ┃ ┃ ┗ 📂register-car_service <br/>
 ┣ 📜.gitignore <br/>
 ┗ 📜README.md <br/>

## System Architecture

![System Architecture](CarSchedulingSystemArchitecture.jpg)

## Quick Start
### 📂office
- 📂arduino <br/>
###### <a href="https://github.com/webOS-KOSS/main-setting/blob/main/Arduino/ESP8266.md">ESP8266 환경 설정</a> -> <a href="https://github.com/webOS-KOSS/main-setting/blob/main/Arduino/CarBarrier.md">차량 차단기 하드웨어 설정</a> -> 📜barrier.ino 업로드
- 📂car-detection <br/>
###### <a href="https://github.com/webOS-KOSS/main-setting/blob/main/webOS/docker.md">docker 설정</a> -> <a href="https://github.com/webOS-KOSS/main-setting/blob/main/webOS/EnactService.md">📂car-detection_app & 📂car-detection_service 앱 설치</a>
