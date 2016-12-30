# Usage

```javascript
import econf from '../index';
// ./config/config.development.js
console.log(econf.get('./config/config::a.b', __dirname));
// oooo
```