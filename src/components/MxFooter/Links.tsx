import React from 'react';

import { getEnvironmentLink } from '../../utils/environmentHelpers';
import { links } from '../../resources/menu/footer.json';

interface TreeNode {
    label?: string;
    url?: string;
    external?: boolean;
    highlighted?: boolean;
    nodes?: TreeNode[];
}

const Link: React.FC<TreeNode> = ({
    highlighted = false,
    url: rawLink,
    label,
    external = false,
}) => {
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
        >
            {label}
        </a>
    ) : (
        <div className={className}>{label}</div>
    );
};

const Links = () => (
    <div className="MxFooter__links-container">
        <div className="MxFooter__links">
            {links.map(({ nodes, ...node }: TreeNode, index: number) => (
                <div className="MxFooter__link-group" key={index}>
                    <Link key={node.label} {...node} />
                    {nodes &&
                        nodes.map(childNode => (
                            <Link key={childNode.label} {...childNode} />
                        ))}
                </div>
            ))}
        </div>
    </div>
);

export default Links;
