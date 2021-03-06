import React from 'react';

/* eslint-disable max-len, react/jsx-space-before-closing */
export default {
    CLOSE: (
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    ),
    DONE_ALL: (
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
        </svg>
    ),
    EDIT: (
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path
                    d="M0 28.5V36h7.5l22.12-22.12-7.5-7.5L0 28.5zM35.42 8.08c.78-.78.78-2.04 0-2.82L30.74.58c-.78-.78-2.04-.78-2.82 0l-3.66 3.66 7.5 7.5 3.66-3.66z"
                    fill="#4A4A4A"
                    fillRule="nonzero"
                />
                <path d="M-6-6h48v48H-6z" />
            </g>
        </svg>
    ),
    NOT_INTERESTED: (
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path d="M-4-4h48v48H-4z" />
                <path
                    d="M20 0C8.96 0 0 8.96 0 20s8.96 20 20 20 20-8.96 20-20S31.04 0 20 0zm0 36c-8.84 0-16-7.16-16-16 0-3.7 1.26-7.1 3.38-9.8L29.8 32.62C27.1 34.74 23.7 36 20 36zm12.62-6.2L10.2 7.38C12.9 5.26 16.3 4 20 4c8.84 0 16 7.16 16 16 0 3.7-1.26 7.1-3.38 9.8z"
                    fill="#4A4A4A"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    ),
    PIPELINE_EMPTY: (
        <svg width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0z" id="a" />
                <mask id="d" x="0" y="0" width="24" height="24" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0z" id="b" />
                <mask id="e" x="0" y="0" width="24" height="24" fill="#fff">
                    <use xlinkHref="#b" />
                </mask>
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0z" id="c" />
                <mask id="f" x="0" y="0" width="24" height="24" fill="#fff">
                    <use xlinkHref="#c" />
                </mask>
            </defs>
            <g transform="translate(-4 -12)" fill="none" fillRule="evenodd">
                <path d="M0 0h128v48H0z" />
                <path fill="#AFAEAE" d="M24 22h83v4H24z" />
                <use mask="url(#d)" xlinkHref="#a" strokeWidth="7" transform="translate(4 12)" stroke="#949393" fill="#FFF" />
                <g transform="translate(100 12)">
                    <path d="M0 0h24v24H0z" />
                    <use stroke="#949393" mask="url(#e)" strokeWidth="7" fill="#FFF" xlinkHref="#b" />
                </g>
                <circle fill="#FFF" cx="64" cy="24" r="10" />
                <use mask="url(#f)" xlinkHref="#c" strokeWidth="7" transform="translate(52 12)" stroke="#949393" fill="#FFF" />
            </g>
        </svg>
    ),
    PIPELINE_RUNNING: (
        <svg width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0z" id="a" />
                <mask id="b" x="0" y="0" width="24" height="24" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
            </defs>
            <g transform="translate(-4 -12)" fill="none" fillRule="evenodd">
                <path d="M0 0h128v48H0z" />
                <path fill="#AFAEAE" d="M24 22h83v4H24z" />
                <path d="M4 12h24v24H4z" />
                <path d="M4 24c0 6.624 5.376 12 12 12s12-5.376 12-12-5.376-12-12-12S4 17.376 4 24z" fill="#78B037" />
                <path fill="#FFF" d="M14 26.8L11.2 24l-.933.933L14 28.667l8-8-.933-.934z" />
                <g transform="translate(100 12)">
                    <path d="M0 0h24v24H0z" />
                    <use stroke="#949393" mask="url(#b)" strokeWidth="7" fill="#FFF" xlinkHref="#a" />
                </g>
                <circle fill="#FFF" cx="64" cy="24" r="10" />
                <g transform="translate(52 12)">
                    <path
                        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-3.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17z"
                        fill="#A7C7F2"
                        fillRule="nonzero"
                    />
                    <circle fill="#60A6D9" cx="12" cy="12" r="3" />
                    <path d="M.213 9.751A12 12 0 1 0 12.001 0v3.5a8.5 8.5 0 1 1-8.35 6.907L.213 9.751z" fill="#1D7DCF" fillRule="nonzero" />
                </g>
            </g>
        </svg>
    ),
    PULL_REQUEST: (
        <svg width="28" height="35" viewBox="0 0 28 35" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path d="M-10-7h48v48h-48z" />
                <path
                    d="M25.667 26.32V11.667c-.07-1.82-.794-3.43-2.194-4.807-1.4-1.377-2.986-2.123-4.806-2.193h-2.334V0l-7 7 7 7V9.333h2.334c.63.047 1.12.257 1.61.724.49.466.7.98.723 1.61V26.32A4.65 4.65 0 0 0 23.333 35a4.65 4.65 0 0 0 2.334-8.68zm-2.334 6.813c-1.54 0-2.8-1.283-2.8-2.8 0-1.516 1.284-2.8 2.8-2.8 1.517 0 2.8 1.284 2.8 2.8 0 1.517-1.283 2.8-2.8 2.8zM9.333 7a4.65 4.65 0 0 0-4.666-4.667 4.65 4.65 0 0 0-2.334 8.68V26.32A4.65 4.65 0 0 0 4.667 35 4.65 4.65 0 0 0 7 26.32V11.013A4.64 4.64 0 0 0 9.333 7zM7.467 30.333c0 1.54-1.284 2.8-2.8 2.8-1.517 0-2.8-1.283-2.8-2.8 0-1.516 1.283-2.8 2.8-2.8 1.516 0 2.8 1.284 2.8 2.8zM4.667 9.8c-1.54 0-2.8-1.283-2.8-2.8s1.283-2.8 2.8-2.8c1.516 0 2.8 1.283 2.8 2.8s-1.284 2.8-2.8 2.8z"
                    fill="#4A4A4A"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    ),
    WARNING: (
        <svg width="44" height="38" viewBox="0 0 44 38" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path d="M-2-4h48v48H-2z" />
                <path d="M0 38h44L22 0 0 38zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z" fill="#000" fillrule="nonzero" />
            </g>
        </svg>
    ),
};
