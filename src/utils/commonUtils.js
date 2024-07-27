"use client";
import { v4 as uuidv4 } from "uuid";
import unidecode from "unidecode";
import { useEffect, useState } from "react";
import slugify from "slugify";

const CreateCode = (name) => {
  name = unidecode(name.replace(/[^a-zA-Z0-9]/g, ""));
  let result = "";
  let code = uuidv4();
  for (var i = 0; i < name.length; i++) {
    if (i % 2 === 0) result += name[i];
  }
  return result.toUpperCase() + code.slice(0, 5).toUpperCase();
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debounceValue;
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.NEXT_PUBLIC_FB_ID,
      cookie: true,
      xfbml: true,
      version: "v20.0",
    });
  };
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const convertSlugUrl = (slug) => {
  if (!slug) return "";
  slug = slugify(slug, {
    lower: true,
    locale: "vi",
  });
  return slug;
};

export default CreateCode;
