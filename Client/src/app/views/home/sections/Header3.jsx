import React, { Component } from 'react';
import CarouselListZoom from '../common/CarouselListZoom';
import Carousel from '../common/Carousel';


class Header3 extends Component {
    state = {
        isSwitchOn: false,
    }
    render() {
        return (
            <div className="container">
                <div className="text-center my-60">
                    <a className="btn btn-primary btn-lg mb-16" href="/session/signup-register-account"> Đăng ký </a>
                    <p className="text-gray">Đã đăng ký tài khoản? <a href="/session/signin"> Đăng nhập </a></p>
                </div>
                <div className="rows my-60">
                    <div className="col-xl-1" />
                    <div className="col">
                        <div className="row category-options ">
                            <div className="col cursor-pointer active pb-3">Tất cả</div>
                            <div className="col cursor-pointer active pb-3">Cho bạn</div>
                            <div className="col cursor-pointer active pb-3">Hôm nay</div>
                            <div className="col cursor-pointer active pb-3">Tuần này</div>
                        </div>
                    </div>
                    <div className="col-xl-1" />
                </div>
                <CarouselListZoom></CarouselListZoom>
            </div>
        );
    }
}

export default Header3;