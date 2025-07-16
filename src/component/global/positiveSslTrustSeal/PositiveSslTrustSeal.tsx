import './positiveSslTrustSeal.sass';

import positiveSslSeal from '../../../assets/positivessl_trust_seal.png';

export default function PositiveSslTrustSeal() {
    return (
        <div id="positivessl-seal-main-container">
            <section>
                <a href="https://www.positivessl.com/" target='_blank'>
                    <img src={positiveSslSeal} alt="PositiveSSL Trust Seal" />
                </a>
            </section>
        </div>
    );
}