import PageHeader, { PageHeaderProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Components/PageHeader",
    component: PageHeader,
    argTypes: {
        titleKey: {
            control: {
                type: "text",
            },
        },
        subtitleKey: {
            control: {
                type: "text",
            },
        },
        detailKey: {
            control: {
                type: "text",
            },
        },
    },
};

const Template: StoryFn<PageHeaderProps> = (args) => {
    return (
        <MemoryRouter>
            <CenteredTemplate>
                <PageHeader {...args} />
            </CenteredTemplate>
        </MemoryRouter>
    );
};
export const Default = Template.bind({});
Default.args = {
    titleKey: "Admin Panel",
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
    titleKey: "Admin Panel",
    subtitleKey: "Manage user permissions and roles",
};

export const WithDetail = Template.bind({});
WithDetail.args = {
    titleKey: "Admin Panel",
    subtitleKey: "Manage user permissions and roles",
    detailKey: "This is a detailed description of the page.",
};

export const WithSubtitleAndDetail = Template.bind({});
WithSubtitleAndDetail.args = {
    titleKey: "Admin Panel",
    subtitleKey: "Manage user permissions and roles",
    detailKey: "This is a detailed description of the page.",
};

export const WithLongSubtitleAndDetail = Template.bind({});
WithLongSubtitleAndDetail.args = {
    titleKey: "Admin Panel",
    subtitleKey: "Manage user permissions and roles. This is a long subtitle that should wrap to the next line.",
    detailKey: "This is a detailed description of the page. This is a long detail that should wrap to the next line.",
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
    titleKey: "Admin Panel. This is a long title that should wrap to the next line.",
};

export const WithLongTitleAndSubtitle = Template.bind({});
WithLongTitleAndSubtitle.args = {
    titleKey: "Admin Panel. This is a long title that should wrap to the next line.",
    subtitleKey: "Manage user permissions and roles",
};

export const WithLongTitleAndDetail = Template.bind({});
WithLongTitleAndDetail.args = {
    titleKey: "Admin Panel. This is a long title that should wrap to the next line.",
    detailKey: "This is a detailed description of the page.",
};

export const WithLongTitleSubtitleAndDetail = Template.bind({});
WithLongTitleSubtitleAndDetail.args = {
    titleKey: "Admin Panel. This is a long title that should wrap to the next line.",
    subtitleKey: "Manage user permissions and roles",
    detailKey: "This is a detailed description of the page.",
};
