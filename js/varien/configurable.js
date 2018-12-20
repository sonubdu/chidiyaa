if(void 0===Product)var Product={};Product.Config=Class.create(),Product.Config.prototype={initialize:function(t){this.config=t,this.taxConfig=this.config.taxConfig,t.containerId?this.settings=$$("#"+t.containerId+" .super-attribute-select"):this.settings=$$(".super-attribute-select"),this.state=new Hash,this.priceTemplate=new Template(this.config.template),this.prices=t.prices,t.defaultValues&&(this.values=t.defaultValues);var i=window.location.href.indexOf("#");if(-1!=i){var e=window.location.href.substr(i+1).toQueryParams();this.values||(this.values={});for(var s in e)this.values[s]=e[s]}t.inputsInitialized&&(this.values={},this.settings.each(function(t){if(t.value){var i=t.id.replace(/[a-z]*/,"");this.values[i]=t.value}}.bind(this))),this.settings.each(function(t){Event.observe(t,"change",this.configure.bind(this))}.bind(this)),this.settings.each(function(t){var i=t.id.replace(/[a-z]*/,"");i&&this.config.attributes[i]&&(t.config=this.config.attributes[i],t.attributeId=i,this.state[i]=!1)}.bind(this));var n=[];for(s=this.settings.length-1;s>=0;s--){var o=!!this.settings[s-1]&&this.settings[s-1],r=!!this.settings[s+1]&&this.settings[s+1];0==s?this.fillSelect(this.settings[s]):this.settings[s].disabled=!0,$(this.settings[s]).childSettings=n.clone(),$(this.settings[s]).prevSetting=o,$(this.settings[s]).nextSetting=r,n.push(this.settings[s])}this.configureForValues(),document.observe("dom:loaded",this.configureForValues.bind(this))},configureForValues:function(){this.values&&this.settings.each(function(t){var i=t.attributeId;t.value=void 0===this.values[i]?"":this.values[i],this.configureElement(t)}.bind(this))},configure:function(t){var i=Event.element(t);this.configureElement(i)},configureElement:function(t){this.reloadOptionLabels(t),t.value?(this.state[t.config.id]=t.value,t.nextSetting&&(t.nextSetting.disabled=!1,this.fillSelect(t.nextSetting),this.resetChildren(t.nextSetting))):this.resetChildren(t),this.reloadPrice()},reloadOptionLabels:function(t){var i;i=t.options[t.selectedIndex].config&&!this.config.stablePrices?parseFloat(t.options[t.selectedIndex].config.price):0;for(var e=0;e<t.options.length;e++)t.options[e].config&&(t.options[e].text=this.getOptionLabel(t.options[e].config,t.options[e].config.price-i))},resetChildren:function(t){if(t.childSettings)for(var i=0;i<t.childSettings.length;i++)t.childSettings[i].selectedIndex=0,t.childSettings[i].disabled=!0,t.config&&(this.state[t.config.id]=!1)},fillSelect:function(t){var i=t.id.replace(/[a-z]*/,""),e=this.getAttributeOptions(i);this.clearSelect(t),t.options[0]=new Option("",""),t.options[0].innerHTML=this.config.chooseText;var s=!1;if(t.prevSetting&&(s=t.prevSetting.options[t.prevSetting.selectedIndex]),e)for(var n=1,o=0;o<e.length;o++){var r=[];if(s)for(var a=0;a<e[o].products.length;a++)s.config.allowedProducts&&s.config.allowedProducts.indexOf(e[o].products[a])>-1&&r.push(e[o].products[a]);else r=e[o].products.clone();r.size()>0&&(e[o].allowedProducts=r,t.options[n]=new Option(this.getOptionLabel(e[o],e[o].price),e[o].id),void 0!==e[o].price&&t.options[n].setAttribute("price",e[o].price),t.options[n].config=e[o],n++)}},getOptionLabel:function(t,i){i=parseFloat(i);if(this.taxConfig.includeTax)var e=(s=i-i/(100+this.taxConfig.defaultTax)*this.taxConfig.defaultTax)*(1+this.taxConfig.currentTax/100);else{var s;e=(s=i)+i*(this.taxConfig.currentTax/100)}i=this.taxConfig.showIncludeTax||this.taxConfig.showBothPrices?e:s;var n=t.label;return i&&(this.taxConfig.showBothPrices?n+=" "+this.formatPrice(s,!0)+" ("+this.formatPrice(i,!0)+" "+this.taxConfig.inclTaxTitle+")":n+=" "+this.formatPrice(i,!0)),n},formatPrice:function(t,i){var e="";t=parseFloat(t),i&&(t<0?(e+="-",t=-t):e+="+");var s=(Math.round(100*t)/100).toString();return this.prices&&this.prices[s]?e+=this.prices[s]:e+=this.priceTemplate.evaluate({price:t.toFixed(2)}),e},clearSelect:function(t){for(var i=t.options.length-1;i>=0;i--)t.remove(i)},getAttributeOptions:function(t){if(this.config.attributes[t])return this.config.attributes[t].options},reloadPrice:function(){if(!this.config.disablePriceReload){for(var t=0,i=0,e=this.settings.length-1;e>=0;e--){var s=this.settings[e].options[this.settings[e].selectedIndex];s.config&&(t+=parseFloat(s.config.price),i+=parseFloat(s.config.oldPrice))}return optionsPrice.changePrice("config",{price:t,oldPrice:i}),optionsPrice.reload(),t}},reloadOldPrice:function(){if(!this.config.disablePriceReload&&$("old-price-"+this.config.productId)){for(var t=parseFloat(this.config.oldPrice),i=this.settings.length-1;i>=0;i--){var e=this.settings[i].options[this.settings[i].selectedIndex];e.config&&(t+=parseFloat(e.config.price))}t<0&&(t=0),t=this.formatPrice(t),$("old-price-"+this.config.productId)&&($("old-price-"+this.config.productId).innerHTML=t)}}};
