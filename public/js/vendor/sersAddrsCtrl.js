define(["jquery","sersAddrs"],function(e){"use strict";var t={clearSelectbox:function(e){var t=0,r=0,s=null;for(null!==e.getAttribute("data-target")&&(s=e.getAttribute("data-target"),document.getElementById(s).innerHTML="请选择"),t=0,r=e.options.length;r>t;t+=1)e.remove(0)},addressSelectAction:function(e){var r=null,s=0,c=0,d=null,n=document.createElement("option");if("请选择"===e.selected?(n.appendChild(document.createTextNode("请选择")),n.setAttribute("value",""),n.setAttribute("selected","true")):"所有"===e.selected?(n.appendChild(document.createTextNode("所有")),n.setAttribute("value","")):(n.appendChild(document.createTextNode("请选择")),n.setAttribute("value","")),t.clearSelectbox(e.selectObj),"请选择"!==e.value&&""!==e.value){if(r=t.qryPlace(e.value,e.isCity),c=r.length,0!==c)for(e.selectObj.appendChild(n),s=0;c>s;s+=1)d=document.createElement("option"),d.appendChild(document.createTextNode(r[s].name)),d.setAttribute("value",r[s].code),r[s].code===parseInt(e.selected,10)&&(d.setAttribute("selected","true"),document.getElementById(e.selectObj.getAttribute("data-target")).innerHTML=d.innerHTML),void 0!==r[s].id&&d.setAttribute("data-value",r[s].id),e.selectObj.appendChild(d)}else e.selectObj.appendChild(n);void 0!==e.resetObj&&(t.clearSelectbox(e.resetObj),n=document.createElement("option"),n.appendChild(document.createTextNode("请选择")),n.setAttribute("value",""),e.resetObj.appendChild(n))},qryPlace:function(e,t){var r=0,s=0,c=0,d=ycs_service_addrs.length,n=0,a=0,i=[];if(void 0!==e){if(t){for(r=0;d>r;r+=1)if(parseInt(e,10)===ycs_service_addrs[r].c)for(s=0,n=ycs_service_addrs[r].s.length;n>s;s+=1)i.push({code:ycs_service_addrs[r].s[s].c,name:ycs_service_addrs[r].s[s].n})}else for(r=0;d>r;r+=1)if(parseInt(e.substr(0,2).concat("0000"),10)===ycs_service_addrs[r].c)for(s=0,n=ycs_service_addrs[r].s.length;n>s;s+=1)if(parseInt(e,10)===ycs_service_addrs[r].s[s].c)for(c=0,a=ycs_service_addrs[r].s[s].s.length;a>c;c+=1)i.push({code:ycs_service_addrs[r].s[s].s[c].c,name:ycs_service_addrs[r].s[s].s[c].n})}else for(r=0;d>r;r+=1)i.push({code:ycs_service_addrs[r].c,name:ycs_service_addrs[r].n});return i},qryName:function(e){var t=null,r=0,s=0,c=function(e,t,r,s,d){var n=null;if(d===Math.round((t+r)/2))return null;if(d=Math.round((t+r)/2),e===s[t].c)return s[t];if(e>s[d].c)n=c(e,d,r,s,d);else if(e<s[d].c)n=c(e,t,d,s,d);else if(e===s[d].c)return s[d];return n};if(e=parseInt(e,10),r=Math.floor(e/1e4),s=11===r||12===r||31===r||50===r?1e4*r+100:100*Math.floor(e/100),e%1e4===0){if(t=c(e,0,ycs_service_addrs.length-1,ycs_service_addrs))return t.n}else if(e%100===0){if(t=c(1e4*Math.floor(e/1e4),0,ycs_service_addrs.length-1,ycs_service_addrs),t&&(t=c(s,0,t.s.length-1,t.s)))return t.n}else if(t=c(1e4*Math.floor(e/1e4),0,ycs_service_addrs.length-1,ycs_service_addrs),t&&(t=c(s,0,t.s.length-1,t.s),t&&(t=c(e,0,t.s.length-1,t.s))))return t.n;return void 0}};return t});