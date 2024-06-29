### Sample Backend using JSON

https://github.com/typicode/json-server

1. Create the file containing sample data. For example, [sample-data.json](./sample-data.json).
2. While running command in step 3 below, you might get error like this:
    `ENOENT: no such file or directory, lstat 'C:\Users\student.DR-06\AppData\Roaming\npm'`
    To fix this, create the required folder by running this in PowerShell:
    `mkdir $env:USERPROFILE\AppData\Roaming\npm`
3. Then run the following in PowerShell :
    `npx json-server sample-data.json --host 0.0.0.0`

    You will get the output from json-server, containing the list of endpoints.
    ```log
    Endpoints:
    http://0.0.0.0:3000/asssignments
    http://0.0.0.0:3000/groups
    ```

### Test the API

1. Install REST Client. [Link to REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Fire HTTP Request using [requests.http](./requests.http) file. To prevent localhost issues with VSCode, we are using 0.0.0.0 IP address.
