import React from 'react';
import "./Final.css";

const Final = () => {
    return (
        <div className="final-container">
            <h1><span>Thank you for applying</span></h1>
            <p><span>An admission team member will contract you shortly.</span></p>
            <div className="social-media">
                <a aria-label="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmetana.typeform.com%2Fbuildform-test%3Futm_source%3Dfacebook%26utm_content%3Dtypeform_social" rel="noopener noreferrer" target="_blank" title="Share on Facebook">
                    <span aria-hidden="true">
                        <svg height="32" version="1" width="32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd"><path d="M0 0h32v32H0z" fill="#FFF"></path>
                                <path d="M0 0v32h17V20h-4v-5h4v-5c0-3 3-5 6-5h4v4h-3l-2 2v4h5l-1 5h-4v12h10V0H0z" fill="#3A559F"></path>
                            </g>
                        </svg>
                    </span>
                </a>

                <a aria-label="Share on Twitter" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fmetana.typeform.com%2Fbuildform-test%3Futm_source%3Dtwitter%26utm_content%3Dtypeform_social" rel="noopener noreferrer" target="_blank" title="Share on Twitter">
                    <span aria-hidden="true">
                        <svg height="32" version="1" width="32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none"><path d="M0 0h32v32H0z" fill="#50ABF1"></path>
                                <path d="m4 24 8 2a14 14 0 0 0 13-14l3-3-3 1 2-3-2 1h-1a5 5 0 0 0-8 5c-1 0-6-1-10-5 0 0-2 3 1 6l-2-1s0 4 4 5H7s1 3 4 4c0 0-3 2-7 2z" fill="#FFF"></path>
                            </g>
                        </svg>
                    </span>
                </a>

                <a aria-label="Share on LinkedIn" href="https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fmetana.typeform.com%2Fbuildform-test%3Futm_source%3Dlinkedin%26utm_content%3Dtypeform_social" rel="noopener noreferrer" target="_blank" title="Share on LinkedIn">
                    <span aria-hidden="true">
                        <svg height="32" version="1" width="32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <path d="M0 0h32v32H0z" fill="#0084B1"></path>
                                <path d="M8 5c1 0 2 1 2 3l-2 2c-2 0-3-1-3-2 0-2 1-3 3-3zm1 22H6l-1-1V13l1-1h3l1 1v13l-1 1zm18-10c0-3-2-5-5-5h-1a5 5 0 0 0-4 2v-2h-4v15h4v-8c0-2 1-3 3-3a3 3 0 0 1 3 3v8h4V17z" fill="#FFF"></path>
                            </g>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Final;
