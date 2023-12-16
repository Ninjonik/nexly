"use client"

import React, { useMemo } from 'react';
import twemoji from 'twemoji';

interface TwTextProps {
    text: string;
}

const TwText: React.FC<TwTextProps> = ({ text }) => {
    const toHTML = useMemo(() => ({ __html: twemoji.parse(text) }), [text]);

    return <span className="tw-text flex flex-row" dangerouslySetInnerHTML={toHTML} />;
};

export default TwText;
