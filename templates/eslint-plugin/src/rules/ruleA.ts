import type { Rule } from 'eslint';

export type MessageIds = 'messageId';

const ruleA: Rule.RuleModule = {
    meta: {
        type: 'problem',
        fixable: 'whitespace',
        docs: {
            description: 'desc',
        },
        messages: {
            messageId: 'Expect to ...',
        },
    },
    create(ctx) {
        return {
            Literal: (node) => {
                ctx.report({
                    messageId: 'messageId',
                    node,
                    // fix(fixer) {
                    // },
                });
            },
        };
    },
};

export default ruleA;
