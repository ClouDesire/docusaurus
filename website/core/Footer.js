/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? language + '/' : '') + doc;
    }

    render() {
        const currentYear = new Date().getFullYear();
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <div>
                        <h5>Pages</h5>
                        <a href={this.docUrl('index.html', false)}>
                            Documentation Index
                        </a>
                        <a href={this.docUrl('api-reference.html', false)}>
                            API Reference
                        </a>
                        <a href={this.docUrl('platform.html', false)}>
                            Platform modules
                        </a>
                        <a href={this.docUrl('opensource.html', false)}>
                            Open Source
                        </a>
                        <a href="https://cloudesire.com">
                            Corporate website
                        </a>
                    </div>
                    <div>
                        <h5>Social</h5>
                        <a href="https://twitter.com/cloudesire" target="_blank">
                            Twitter
                        </a>
                        <a href="https://fb.com/cloudesire" target="_blank">
                            Facebook
                        </a>
                        <a href="https://github.com/cloudesire" target="_blank">
                            GitHub
                        </a>
                    </div>
                </section>

                <section className="copyright">
                    {this.props.config.copyright && (
                        <span>{this.props.config.copyright}</span>
                    )}{' '}
                </section>
            </footer>
        );
    }
}

module.exports = Footer;
