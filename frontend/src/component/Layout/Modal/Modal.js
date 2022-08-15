import React,{useRef, useEffect} from 'react';
import Styles from './Modal.module.css';



const Modal = ({children, setIsOpen}) => {

  function useOutsideAlerter(ref) {
    useEffect(() => {
  
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setIsOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className={Styles.container}>
        {children}
    </div>
  )
}

export default Modal

/*****
import React, { useRef, useEffect } from "react";


 function useOutsideAlerter(ref) {
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}







 ********/