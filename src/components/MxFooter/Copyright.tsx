import React from 'react';

import { copyRightLinks } from '../../resources/menu/footer.json';

const copyRight = `Copyright &copy; ${new Date().getFullYear()} Mendix Technology B.V.`;

const Copyright = () => (
    <span className="MxFooter__copyright">
        {copyRight}
        {copyRightLinks.map(
            ({ label, url }: { label: string; url: string }) => (
                <span
                    key={label}
                    className="MxFooter__copyright-link-container"
                >
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="MxFooter__copyright-link"
                    >
                        {label}
                    </a>
                </span>
            )
        )}
    </span>
);

export default Copyright;
