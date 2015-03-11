<p />
<p />
The  {@link com.devnup.ws.api.util.SSHUtil SSH Util} is a utility module for sending bash commands to remote environments using SSH. It is based on the SSH2 NPM package. 
<p><br /></p>

**Useful links**
- {@link https://github.com/mscdex/ssh2 SSH2 Github repository}
- {@link https://www.npmjs.org/package/ssh2 SSH2 NPM module page}
<p><br /></p>

**Getting started**

To use the module simply import the file using ```require```.

```javascript
var ssh = require('./path/to/sshutil');

// Put ssh command in queue for processing
ssh.queue.run(name, {

  host: 'ssh.domain.com'
  username: 'root',
  key: 'ec2.pem', // the PEM file must be in repository path defined in default.json
  cmd: 'sudo reboot'

}, function (err) {

  if (err) {

    // Return JSON error
    res.json({
      result: 'error',
      message: 'Could not sent deploy command to queue',
      error: err
    });

  } else {

    // Return JSON success
    res.json({
      result: 'success',
      message: 'Deploy sent to queue',
      data: {
        id: name
      }
    });
  }

});
```