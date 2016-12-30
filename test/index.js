/**
 * Created by ljm on 16-11-11.
 */
import econf from '../index';

console.log(econf.get('./config/config::a.b', __dirname));