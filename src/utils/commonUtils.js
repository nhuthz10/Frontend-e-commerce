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

export const convertSlugUrl = (slug) => {
  if (!slug) return "";
  slug = slugify(slug, {
    lower: true,
    locale: "vi",
  });
  return slug;
};

export function formatISODate(isoString) {
  const date = new Date(isoString);

  const daysOfWeek = [
    'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${dayOfWeek}, ${day}-${month}-${year}`;
}

export default CreateCode;
