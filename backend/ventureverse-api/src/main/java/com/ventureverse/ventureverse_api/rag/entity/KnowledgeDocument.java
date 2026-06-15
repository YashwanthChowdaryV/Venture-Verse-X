package com.ventureverse.ventureverse_api.rag.entity;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KnowledgeDocument {

    private String title;

    private String content;
}