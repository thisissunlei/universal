import intl from "react-intl-universal";
import _ from "lodash";
import axios from "axios";
import React, { Component } from "react";
import PluralComponent from "./Plural";
import BasicComponent from "./Basic";
import HtmlComponent from "./Html";
import DateComponent from "./Date";
import CurrencyComponent from "./Currency";
import MessageNotInComponent from "./MessageNotInComponent";
import "./app.css";

const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "简体中文",
    value: "zh-CN"
  },
  {
    name: "繁體中文",
    value: "zh-TW"
  },
  {
    name: "français",
    value: "fr-FR"
  },
  {
    name: "日本の",
    value: "ja-JP"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectLocale = this.onSelectLocale.bind(this);
    this.state = {
      initDone: false, 
      currentLocale:"en-US" // 初始默认语言 
    }
  }

  componentDidMount() {
    // 初始化本地数据 
    this.loadLocales();
  }

  render() {
    return (
      this.state.initDone &&
      <div>
        {console.log(this.state.currentLocale +'____')}
        {this.renderLocaleSelector()}
        <BasicComponent />
        <PluralComponent />
        <HtmlComponent />
        <DateComponent />
        <CurrencyComponent />
        <MessageNotInComponent />
      </div>
    );
  }
  
  // 注册本地语言环境 
  certify(currentLocale){
    return currentLocale && 
      axios
    .get(`locales/${currentLocale}.json`)
    .then(res => {
     // 注册本地语言资源 Api 
      return intl.init({
        currentLocale,
        locales: {
          [currentLocale]: res.data
        }
      });
    })
  }
  
  //首次加载 
  loadLocales() {
   let { currentLocale } = this.state; // 默认首次加载的是英文
   this.certify(currentLocale)
      .then(() => {
        // 加载完成之后 再render 刷新页面 
        this.setState({ initDone: true });
      });
  }

  // 加载多个可供选择语言切换的下拉框
  renderLocaleSelector() {
    return (
      <select onChange={ this.onSelectLocale.bind(this) } defaultValue="">
        <option value="" disabled>Change Language</option>
        {SUPPOER_LOCALES.map(locale => (
          <option key={locale.value} value={locale.value}>{locale.name}</option>
        ))}
      </select>
    );
  }
 // 切换更新本地语言环境
  onSelectLocale(e) { 
    let currentLocale = e.target.value;
    this.certify(currentLocale)
      .then( () => {
        // 刷新页面 显示 
        this.setState({
          currentLocale:currentLocale
        })
      })
  }
}

export default App;
