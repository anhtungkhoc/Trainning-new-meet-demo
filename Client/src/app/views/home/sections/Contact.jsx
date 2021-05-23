import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <footer className="footer">
                    <div>
                        <div className="container">
                            <div className="footer-content">
                                <div className="f1">
                                    <h3>Đơn vị tổ chức</h3>
                                    <img className="img-fluid" src="/assets/images/logo-footer.png" alt="" />
                                </div>
                                <div className="f2">
                                    <h3>Liên hệ</h3>
                                    <p className="text-gray">
                                        Email:
                                        <a href="mailto:">contact@amber.edu.vn</a>
                                        <br />
                                        Tel:
                                        <a href="tel:+"> 083.382.1008</a>
                                        – <a href="tel:"> 024.6666.3018</a>
                                    </p>
                                </div>
                                <div className="d-flex flex-column justify-content-between f3">
                                    <h3 className="footer-social-icons">
                                        <a href="https://www.facebook.com/amber.online.education" target="_blank">
                                            <img className="mr-10" src="/assets/images/social-facebook.png" alt="" />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCuyFd_xSr_AQxhCAq6BvUrA/" target="_blank">
                                            <img className="mr-10" src="/assets/images/social-twitter.png" alt="" />
                                        </a>
                                        <a href="https://www.linkedin.com/company/amber-online-education/" target="_blank">
                                            <img className="mr-10" src="/assets/images/social-linkedin.png" alt="" />
                                        </a>
                                    </h3><p className="text-gray">© Copyright 2021 meetEdTech.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default Contact;