# Airline Web CTF Challenge
 
It is a Web Based CTF Challenge.

## Development Stack

* Node Js

## How to deploy/install
  1. Clone the Repository
  2. Run the following command on terminal. Use desired port number in place of PORT_NUMBER
  ```shell
     sudo ./deployment.sh PORT_NUMBER
  ```
  3. Access the image on the port you entered.
  
## How to play/solve the challenge

1. Access robots.txt file
2. Access usernames.txt and passwords.txt file.
3. Brute force usernames and password combinations on the admin portal and get admin access.
    ```shell
    Login Credentials:
      Username - SMD_ADMIN
      Password - zag12wsx
    ```
4. Open flight schedule web page.
5. Decode the base64 encoded hash in the creds column. You shall obtain a cipher text.
6. Crack the Vignere Cipher text using the key "arb".
7. Submit the flag: 
    ```shell
    flag{secretive_flights_you_@r3_crypt0_m@st3r}
    ```
    
## Author
Aneesh Dua
