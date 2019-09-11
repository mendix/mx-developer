import React, { ReactNode } from 'react';

import { getEnvironmentLink } from '../../utils/environmentHelpers';
import { links } from '../../resources/menu/footer.json';

interface TreeNode {
    label?: string;
    url?: string;
    external?: boolean;
    highlighted?: boolean;
    nodes?: TreeNode[];
}

const generateLink = ({
    highlighted = false,
    url: rawLink,
    label,
    external = false,
}: TreeNode): ReactNode | null => {
    const className = highlighted
        ? 'MxFooter__link--highlighted'
        : 'MxFooter__link';

    if (!label) return null;

    const url = rawLink && getEnvironmentLink(rawLink);

    return url ? (
        <a
            href={url}
            className={className}
            target={external ? '_blank' : '_self'}
            key={label}
        >
            {label}
        </a>
    ) : (
        <div className={className} key={label}>
            {label}
        </div>
    );
};

const Links = () => (
    <div className="MxFooter__links-container">
        <div className="MxFooter__links">
            {links.map(({ nodes, ...node }: TreeNode, index: number) => (
                <div className="MxFooter__link-group" key={index}>
                    {generateLink(node)}
                    {nodes && nodes.map(generateLink)}
                </div>
            ))}
        </div>
    </div>
);

export default Links;
